import { Test, TestingModule } from '@nestjs/testing';
import { MembershipPlansController } from './membership_plans.controller';
import { MembershipPlansService } from './membership_plans.service';

describe('MembershipPlansController', () => {
  let controller: MembershipPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipPlansController],
      providers: [{ provide: MembershipPlansService, useValue: {} }],
    }).compile();

    controller = module.get<MembershipPlansController>(MembershipPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
