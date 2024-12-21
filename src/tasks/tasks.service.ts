// File: src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }

    async update(id: number, updateData: Partial<Task>): Promise<Task> {
        await this.taskRepository.update(id, updateData);
        return this.taskRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}