import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from '../../generated/prisma/enums.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(status?: TaskStatus) {
    return this.prisma.task.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        assignee: dto.assignee,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async updateStatus(id: string, dto: UpdateTaskStatusDto) {
    await this.findOneOrFail(id);
    return this.prisma.task.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async remove(id: string) {
    await this.findOneOrFail(id);
    await this.prisma.task.delete({ where: { id } });
  }

  private async findOneOrFail(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea con id "${id}" no encontrada`);
    }
    return task;
  }
}
