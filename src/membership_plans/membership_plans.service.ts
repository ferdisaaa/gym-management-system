import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipPlan } from './entities/membership_plan.entity';
import { CreateMembershipPlanDto } from './dto/create-membership_plan.dto';
import { UpdateMembershipPlanDto } from './dto/update-membership_plan.dto';

@Injectable()
export class MembershipPlansService {
  constructor(
    @InjectRepository(MembershipPlan) private repo: Repository<MembershipPlan>,
  ) {}

  create(dto: CreateMembershipPlanDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const plan = await this.repo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Paket ${id} tidak ditemukan`);
    return plan;
  }

  async update(id: number, dto: UpdateMembershipPlanDto) {
    const plan = await this.findOne(id);
    return this.repo.save(Object.assign(plan, dto));
  }

  async remove(id: number) {
    const plan = await this.findOne(id);
    await this.repo.remove(plan);
    return { message: 'Paket berhasil dihapus' };
  }
}