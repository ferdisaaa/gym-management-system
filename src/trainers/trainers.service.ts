import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainers.entity';
import { CreateTrainerDto } from './dto/create-trainers.dto';
import { UpdateTrainerDto } from './dto/update-trainers.dto';

@Injectable()
export class TrainersService {
  constructor(@InjectRepository(Trainer) private repo: Repository<Trainer>) {}

  create(dto: CreateTrainerDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const trainer = await this.repo.findOne({ where: { id } });
    if (!trainer) throw new NotFoundException(`Trainer ${id} tidak ditemukan`);
    return trainer;
  }

  async update(id: number, dto: UpdateTrainerDto) {
    const trainer = await this.findOne(id);
    return this.repo.save(Object.assign(trainer, dto));
  }

  async remove(id: number) {
    const trainer = await this.findOne(id);
    await this.repo.remove(trainer);
    return { message: 'Trainer berhasil dihapus' };
  }
}