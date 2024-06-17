import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Only add the rawbody string if this is a webhook request.
  // This is used by the /user POST endpoint to verify the webhook signature from Clerk
  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['svix-signature'] && !req.headers['x-signature']) {
      return;
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));
  app.use(cookieParser());

  await app.listen(3001);
}
bootstrap();
