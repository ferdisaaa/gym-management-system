
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrainingSession } from './entities/training-session.entity';
import { Trainer } from '../trainers/entities/trainers.entity';

import { CreateTrainingSessionDto } from './dto/create-training-session.dto';
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto';

@Injectable()
export class TrainingSessionsService {
  constructor(
    @InjectRepository(TrainingSession)
    private readonly sessionRepository: Repository<TrainingSession>,

    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  // 1. Membuat training session
  async create(dto: CreateTrainingSessionDto) {
    const trainer = await this.trainerRepository.findOne({
      where: { id: dto.trainerId },
    });

    if (!trainer) {
      throw new NotFoundException('Trainer tidak ditemukan');
    }

    if (dto.endTime <= dto.startTime) {
      throw new BadRequestException(
        'Waktu selesai harus lebih besar dari waktu mulai',
      );
    }

    const session = this.sessionRepository.create({
      title: dto.title,
      description: dto.description,
      sessionDate: dto.sessionDate,
      startTime: dto.startTime,
      endTime: dto.endTime,
      capacity: dto.capacity,
      trainer: trainer,
    });

    return this.sessionRepository.save(session);
  }

  // 2. Menampilkan seluruh training session
  async findAll() {
    return this.sessionRepository.find({
      relations: {
        trainer: true,
      },
      order: {
        sessionDate: 'ASC',
        startTime: 'ASC',
      },
    });
  }

  // 3. Menampilkan detail training session berdasarkan ID
  async findOne(id: number) {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: {
        trainer: true,
        participants: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Training session tidak ditemukan');
    }

    return session;
  }

  // 4. Memperbarui training session
  async update(id: number, dto: UpdateTrainingSessionDto) {
    const session = await this.findOne(id);

    if (dto.trainerId !== undefined) {
      const trainer = await this.trainerRepository.findOne({
        where: { id: dto.trainerId },
      });

      if (!trainer) {
        throw new NotFoundException('Trainer tidak ditemukan');
      }

      session.trainer = trainer;
    }

    const newStartTime = dto.startTime ?? session.startTime;
    const newEndTime = dto.endTime ?? session.endTime;

    if (newEndTime <= newStartTime) {
      throw new BadRequestException(
        'Waktu selesai harus lebih besar dari waktu mulai',
      );
    }

    session.title = dto.title ?? session.title;
    session.description = dto.description ?? session.description;
    session.sessionDate = dto.sessionDate ?? session.sessionDate;
    session.startTime = newStartTime;
    session.endTime = newEndTime;
    session.capacity = dto.capacity ?? session.capacity;
    session.status = dto.status ?? session.status;

    return this.sessionRepository.save(session);
  }

  // 5. Menghapus training session
  async remove(id: number) {
    const session = await this.findOne(id);

    await this.sessionRepository.remove(session);

    return {
      message: 'Training session berhasil dihapus',
    };
  }
}
