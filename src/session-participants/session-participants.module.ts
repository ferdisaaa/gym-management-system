
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionParticipantsController } from './session-participants.controller';
import { SessionParticipantsService } from './session-participants.service';

import { SessionParticipant } from './entities/session-participant.entity';
import { TrainingSession } from '../training-sessions/entities/training-session.entity';
import { Member } from '../members/entities/members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionParticipant,
      TrainingSession,
      Member,
    ]),
  ],
  controllers: [SessionParticipantsController],
  providers: [SessionParticipantsService],
  exports: [SessionParticipantsService],
})
export class SessionParticipantsModule {}
