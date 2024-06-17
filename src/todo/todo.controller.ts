import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma } from '@prisma/client';
import { ClerkAuthGuard } from 'src/clerk/clerk-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodoItem(@Body() data: Prisma.TodoItemCreateInput) {
    return this.todoService.createTodoItem(data);
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuard) // Protect the route with ClerkAuthGuard - __session cookie must be present
  async todoItem(@Param('id') id: string) {
    return this.todoService.todoItem(id);
  }

  @Get()
  async todoItems(
    @Query()
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.TodoItemWhereUniqueInput;
      where?: Prisma.TodoItemWhereInput;
      orderBy?: Prisma.TodoItemOrderByWithRelationInput;
    },
  ) {
    return this.todoService.todoItems(params);
  }

  @Put(':id')
  async updateTodoItem(
    @Param('id') id: string,
    @Body() data: Prisma.TodoItemUpdateInput,
  ) {
    return this.todoService.updateTodoItem({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  async deleteTodoItem(@Param('id') id: string) {
    return this.todoService.deleteTodoItem({ id });
  }

  @Delete()
  async deleteTodoItems(
    @Query() { where }: { where: Prisma.TodoItemWhereInput },
  ) {
    return this.todoService.deleteTodoItems({ where });
  }
}
