import { Test, TestingModule } from '@nestjs/testing';
import { SessionParticipantsService } from './session-participants.service';

describe('SessionParticipantsService', () => {
  let service: SessionParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionParticipantsService],
    }).compile();

    service = module.get<SessionParticipantsService>(SessionParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
