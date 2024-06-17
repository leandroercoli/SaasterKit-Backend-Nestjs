import { Module } from '@nestjs/common';
import { LemonSqueezyController } from './lemon-squeezy.controller';
import { LemonSqueezyService } from './lemon-squeezy.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LemonSqueezyController],
  providers: [LemonSqueezyService, PrismaService],
})
export class LemonSqueezyModule {}
