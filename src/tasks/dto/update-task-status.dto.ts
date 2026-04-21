import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../../../generated/prisma/enums.js';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
