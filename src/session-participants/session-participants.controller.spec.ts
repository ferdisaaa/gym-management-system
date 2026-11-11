import { Test, TestingModule } from '@nestjs/testing';
import { SessionParticipantsController } from './session-participants.controller';

describe('SessionParticipantsController', () => {
  let controller: SessionParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionParticipantsController],
    }).compile();

    controller = module.get<SessionParticipantsController>(SessionParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
