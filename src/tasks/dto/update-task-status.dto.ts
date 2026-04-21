import { IsEnum, IsNotEmpty } from 'class-validator';
import type { TaskStatus } from '../task.entity.js';

export class UpdateTaskStatusDto {
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  @IsNotEmpty()
  status: TaskStatus;
}
