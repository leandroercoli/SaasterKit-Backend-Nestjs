import { Controller, Get, Param, Post } from '@nestjs/common';
import { ClerkRequest } from '../clerk/clerk-request.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Clerk webhook endpoint for user creation
  @Post()
  async processClerkWebhook(@ClerkRequest() request: any) {
    return this.userService.processWebhook(request);
  }

  // Get all users from Clerk
  @Get(':userId')
  async getUserSessions(@Param('userId') userId: string) {
    return this.userService.getUserSessions(userId);
  }
}
