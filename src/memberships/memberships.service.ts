import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Membership, MembershipStatus } from './entities/memberships.entity';
import { CreateMembershipDto } from './dto/create-memberships.dto';
import { UpdateMembershipDto } from './dto/update-memberships.dto';
import { MembersService } from '../members/members.service';
import { MembershipPlansService } from '../membership_plans/membership_plans.service'; // SESUAIKAN nama class

// pakai tanggal lokal, bukan UTC
const toDateStr = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership) private repo: Repository<Membership>,
    private membersService: MembersService,
    private plansService: MembershipPlansService,
  ) {}

  // tandai otomatis keanggotaan yang sudah lewat tanggal berakhir
  private async refreshExpired() {
    const today = toDateStr(new Date());
    await this.repo.update(
      { status: MembershipStatus.ACTIVE, endDate: LessThan(today) },
      { status: MembershipStatus.EXPIRED },
    );
  }

  async create(dto: CreateMembershipDto) {
    const member = await this.membersService.findOne(dto.memberId);
    const plan = await this.plansService.findOne(dto.planId);

    const start = dto.startDate
      ? new Date(`${dto.startDate}T00:00:00`)
      : new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + plan.durationDays);

    const startDate = toDateStr(start);
    const endDate = toDateStr(end);

    // cegah keanggotaan aktif yang periodenya tumpang tindih
    await this.refreshExpired();
    const active = await this.repo.find({
      where: { member: { id: member.id }, status: MembershipStatus.ACTIVE },
    });
    const overlap = active.some(
      (m) => startDate <= m.endDate && endDate >= m.startDate,
    );
    if (overlap) {
      throw new BadRequestException(
        'Anggota masih memiliki keanggotaan aktif pada periode tersebut',
      );
    }

    return this.repo.save(
      this.repo.create({
        member,
        plan,
        startDate,
        endDate,
        status: MembershipStatus.ACTIVE,
      }),
    );
  }

  async findAll() {
    await this.refreshExpired();
    return this.repo.find({
      relations: { member: true, plan: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    await this.refreshExpired();
    const m = await this.repo.findOne({
      where: { id },
      relations: { member: true, plan: true },
    });
    if (!m) throw new NotFoundException(`Keanggotaan ${id} tidak ditemukan`);
    return m;
  }

  // riwayat keanggotaan satu anggota
  async findByMember(memberId: number) {
    await this.membersService.findOne(memberId);
    await this.refreshExpired();
    return this.repo.find({
      where: { member: { id: memberId } },
      relations: { plan: true },
      order: { startDate: 'DESC' },
    });
  }

  // status keanggotaan terkini satu anggota
  async getStatus(memberId: number) {
    const member = await this.membersService.findOne(memberId);
    await this.refreshExpired();
    const active = await this.repo.findOne({
      where: { member: { id: memberId }, status: MembershipStatus.ACTIVE },
      relations: { plan: true },
      order: { endDate: 'DESC' },
    });

    if (!active) {
      return {
        memberId,
        memberName: member.name,
        status: 'inactive',
        message: 'Tidak ada keanggotaan aktif',
      };
    }

    const sisaHari = Math.ceil(
      (new Date(`${active.endDate}T00:00:00`).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    );
    return {
      memberId,
      memberName: member.name,
      status: active.status,
      plan: active.plan.name,
      startDate: active.startDate,
      endDate: active.endDate,
      sisaHari: Math.max(sisaHari, 0),
    };
  }

  async updateStatus(id: number, dto: UpdateMembershipDto) {
    const m = await this.findOne(id);
    m.status = dto.status;
    return this.repo.save(m);
  }

  async remove(id: number) {
    const m = await this.findOne(id);
    await this.repo.remove(m);
    return { message: 'Keanggotaan berhasil dihapus' };
  }
}