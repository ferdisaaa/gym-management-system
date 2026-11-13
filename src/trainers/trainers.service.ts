import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainers.entity';
import { CreateTrainerDto } from './dto/create-trainers.dto';
import { UpdateTrainerDto } from './dto/update-trainers.dto';

@Injectable()
export class TrainersService {
  constructor(@InjectRepository(Trainer) private repo: Repository<Trainer>) { }

  async create(dto: CreateTrainerDto) {
    // 1. Cek  email atau phone trainer sudah terdaftar sebelumnya
    const existingTrainer = await this.repo.findOne({
      where: [
        { email: dto.email },
        { phone: dto.phone },
      ],
    });

    if (existingTrainer) {
      if (existingTrainer.email === dto.email) {
        throw new ConflictException('Email trainer sudah terdaftar oleh trainer lain.');
      }
      if (existingTrainer.phone === dto.phone) {
        throw new ConflictException('Nomor telepon trainer sudah terdaftar oleh trainer lain.');
      }
    }

    // 2. Jika aman, simpan data trainer baru
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