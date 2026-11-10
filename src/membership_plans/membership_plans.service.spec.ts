import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MembershipPlan } from './entities/membership_plan.entity';
import { MembershipPlansService } from './membership_plans.service';

describe('MembershipPlansService', () => {
  let service: MembershipPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipPlansService,
        { provide: getRepositoryToken(MembershipPlan), useValue: {} },
      ],
    }).compile();

    service = module.get<MembershipPlansService>(MembershipPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
