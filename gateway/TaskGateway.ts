import { TaskPort } from '../port/TaskPort'
import { TaskDriver } from '../infrastructure/TaskDriver'
import {
    Task,
    TaskContent,
    TaskCreatedAt,
    TaskId,
    Tasks,
    TaskStatus,
    TaskUpdatedAt
} from '../domain/Task'

export class TaskGateway implements TaskPort {
    private taskDriver: TaskDriver

    constructor(taskDriver: TaskDriver) {
        this.taskDriver = taskDriver
    }

    private convertTask(result: any) {
        const task = new Task(
            new TaskId(result.id),
            new TaskContent(result.content),
            new TaskStatus(result.status),
            new TaskCreatedAt(result.created_at),
            new TaskUpdatedAt(result.updated_at)
        )

        return task
    }

    async find(id: number): Promise<Task> {
        const result = await this.taskDriver.find(id)

        return this.convertTask(result[0])
    }

    async findAll(): Promise<Tasks> {
        try {
            const results = await this.taskDriver.findAll()

            return results.map((result: Task) => {
                return this.convertTask(result)
            })
        } catch (e) {
            throw e
        }
    }

    async create(content: String): Promise<any> {
        try {
            const result = await this.taskDriver.create(content)

            return result
        } catch (e) {
            throw e
        }
    }

    async update(task: Task): Promise<any> {
        try {
            const result = await this.taskDriver.update(task)

            return result
        } catch (e) {
            throw e
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const result = await this.taskDriver.delete(id)

            return result
        } catch (e) {
            throw e
        }
    }
}