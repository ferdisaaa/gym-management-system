import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trainer } from './entities/trainers.entity';
import { TrainersService } from './trainers.service';

describe('TrainersService', () => {
  let service: TrainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainersService,
        { provide: getRepositoryToken(Trainer), useValue: {} },
      ],
    }).compile();

    service = module.get<TrainersService>(TrainersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
