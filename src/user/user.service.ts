import { WebhookEvent, clerkClient } from '@clerk/clerk-sdk-node';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(UserService.name);

  async processWebhook(event: WebhookEvent) {
    const type = event.type;
    const { id: clerkUserId } = event.data;

    // Create a new user
    if (type === 'user.created') {
      const { email_addresses = [] } = event.data;
      const email = email_addresses?.[0]?.email_address ?? '';

      if (!email) throw new Error('No email address provided');

      const user = await this.prisma.user.upsert({
        where: {
          clerkUserId,
        },
        update: {
          clerkUserId,
          email,
        },
        create: {
          clerkUserId,
          email,
        },
      });

      this.logger.log(`Created user with email: ${email}`);

      return user;
    }

    // Delete an existing user
    if (type === 'user.deleted') {
      const user = await this.prisma.user.delete({
        where: {
          clerkUserId,
        },
      });

      this.logger.log(`Deleted user with ID: ${clerkUserId}`);

      return user;
    }

    return;
  }

  // Just for demo, get a list of sessions for a user from Clerk using the clerkClient
  async getUserSessions(userId: string) {
    return clerkClient.sessions.getSessionList({
      userId,
    });
  }
}
