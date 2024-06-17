import { Controller, Post } from '@nestjs/common';
import { LemonSqueezyService } from './lemon-squeezy.service';
import { LemonSqueezyRequest } from './lemon-squeezy-request.decorator';

@Controller('lemon-squeezy')
export class LemonSqueezyController {
  constructor(private readonly lemonSqueezyService: LemonSqueezyService) {}

  // Lemon Squeezy webhook endpoint
  @Post()
  async processLemonSqueezyWebhook(@LemonSqueezyRequest() request: any) {
    return this.lemonSqueezyService.processWebhook(request);
  }
}
