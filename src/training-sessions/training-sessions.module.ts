
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainingSessionsController } from './training-sessions.controller';
import { TrainingSessionsService } from './training-sessions.service';

import { TrainingSession } from './entities/training-session.entity';
import { Trainer } from '../trainers/entities/trainers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingSession,
      Trainer,
    ]),
  ],
  controllers: [TrainingSessionsController],
  providers: [TrainingSessionsService],
  exports: [TrainingSessionsService],
})
export class TrainingSessionsModule {}
