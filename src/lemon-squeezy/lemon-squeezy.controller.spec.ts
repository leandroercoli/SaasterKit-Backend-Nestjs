import { Test, TestingModule } from '@nestjs/testing';
import { LemonSqueezyController } from './lemon-squeezy.controller';

describe('LemonSqueezyController', () => {
  let controller: LemonSqueezyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LemonSqueezyController],
    }).compile();

    controller = module.get<LemonSqueezyController>(LemonSqueezyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
