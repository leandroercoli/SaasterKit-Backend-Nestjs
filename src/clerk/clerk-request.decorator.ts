import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';
import { Webhook } from 'svix';

// Verifies if the webhook signature is valid against the WEBHOOK_SECRET env variable
export const ClerkRequest = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    // Check if the WEBHOOK_SECRET is set
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error('You need a WEBHOOK_SECRET in your .env');
    }

    // Get the request object
    const request = ctx.switchToHttp().getRequest();

    // Get the headers from the request
    const headers = request.headers;

    // Get the Svix headers for verification
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];

    // If there are no Svix headers, error out - this request is not from Clerk
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      });
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Get the raw body of the request to verify the webhook
    const payload = request.rawBody;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      console.log('Error verifying webhook:', err.message);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Missing Authorization Header',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return evt;
  },
);
