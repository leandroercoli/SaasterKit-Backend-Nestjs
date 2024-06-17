import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Use the strict middleware that raises an error when unauthenticated
      .apply(
        ClerkExpressRequireAuth({
          onError: (error: string) => {
            throw new Error(error);
          },
        }),
      )
      // For demo purposes, exclude the GET /todo and GET /todo/:id routes from the middleware
      .exclude(
        {
          path: 'todo',
          method: RequestMethod.GET,
        },
        {
          path: 'todo/:id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(TodoController);
  }
}
