import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { LemonSqueezyModule } from './lemon-squeezy/lemon-squeezy.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    // Will read .env file and load it into process.env
    ConfigModule.forRoot(),
    LemonSqueezyModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
