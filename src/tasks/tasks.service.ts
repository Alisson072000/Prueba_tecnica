import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Task, TaskStatus } from './task.entity.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto.js';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  findAll(status?: TaskStatus): Task[] {
    if (status) {
      return this.tasks.filter((t) => t.status === status);
    }
    return [...this.tasks];
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description,
      assignee: dto.assignee,
      status: 'TODO',
      createdAt: new Date(),
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    };
    this.tasks.push(task);
    return task;
  }

  updateStatus(id: string, dto: UpdateTaskStatusDto): Task {
    const task = this.findOneOrFail(id);
    task.status = dto.status;
    return task;
  }

  remove(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Tarea con id "${id}" no encontrada`);
    }
    this.tasks.splice(index, 1);
  }

  private findOneOrFail(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Tarea con id "${id}" no encontrada`);
    }
    return task;
  }
}
