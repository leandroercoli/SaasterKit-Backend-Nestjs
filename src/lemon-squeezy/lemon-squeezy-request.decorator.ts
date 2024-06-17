import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { webhookHasData, webhookHasMeta } from './lemon-squeezy.utils';

// Verifies if the webhook signature is valid against the WEBHOOK_SECRET env variable
export const LemonSqueezyRequest = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    // Check if the WEBHOOK_SECRET is set
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error('You need a LEMONSQUEEZY_WEBHOOK_SECRET in your .env');
    }

    // Get the request object
    const request = ctx.switchToHttp().getRequest();

    const { rawBody, headers } = request;

    // Check the request signature
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signature = Buffer.from(headers['x-signature'] || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Missing Signature Header',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const evt = JSON.parse(rawBody);

    // Check if the event has meta data
    if (!webhookHasMeta(evt)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Missing Event Meta',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // Check if the event has data
    if(!webhookHasData(evt)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Missing Event Data',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // Return the event payload
    return evt;
  },
);
