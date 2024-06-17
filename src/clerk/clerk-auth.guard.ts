import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  // Verifies if the session token is valid
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      await clerkClient.verifyToken(request.cookies.__session);
    } catch (err) {
      this.logger.error(err);
      return false;
    }
    return true;
  }
}
