import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodoItem(data: Prisma.TodoItemCreateInput) {
    return this.prisma.todoItem.create({
      data,
    });
  }

  async todoItem(id: string) {
    return this.prisma.todoItem.findUnique({
      where: {
        id
      },
    });
  }

  async todoItems(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoItemWhereUniqueInput;
    where?: Prisma.TodoItemWhereInput;
    orderBy?: Prisma.TodoItemOrderByWithRelationInput;
  }) {
    return this.prisma.todoItem.findMany({
      ...params,
    });
  }

  async updateTodoItem(params: {
    where: Prisma.TodoItemWhereUniqueInput;
    data: Prisma.TodoItemUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.todoItem.update({
      data,
      where,
    });
  }

  async deleteTodoItem(where: Prisma.TodoItemWhereUniqueInput) {
    return this.prisma.todoItem.delete({
      where,
    });
  }

  async deleteTodoItems({ where }: { where: Prisma.TodoItemWhereInput }) {
    return this.prisma.todoItem.deleteMany({
      where,
    });
  }
}
