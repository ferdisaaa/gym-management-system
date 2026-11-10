import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/members.entity';
import { CreateMemberDto } from './dto/create-members.dto';
import { UpdateMemberDto } from './dto/update-members.dto';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private repo: Repository<Member>) {}

  create(dto: CreateMemberDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const member = await this.repo.findOne({ where: { id } });
    if (!member) throw new NotFoundException(`Member ${id} tidak ditemukan`);
    return member;
  }

  async update(id: number, dto: UpdateMemberDto) {
    const member = await this.findOne(id);
    return this.repo.save(Object.assign(member, dto));
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    await this.repo.remove(member);
    return { message: 'Member berhasil dihapus' };
  }
}