import { Test, TestingModule } from '@nestjs/testing';
import { LemonSqueezyService } from './lemon-squeezy.service';

describe('LemonSqueezyService', () => {
  let service: LemonSqueezyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LemonSqueezyService],
    }).compile();

    service = module.get<LemonSqueezyService>(LemonSqueezyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
