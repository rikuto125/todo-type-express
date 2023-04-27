import { Task, Tasks } from '../domain/Task'

export interface TaskPort {
    findAll(): Promise<Tasks>
    find(id: number): Promise<Task>
    create(content: String): Promise<any>
    update(task: Task): Promise<any>
    delete(id: number): Promise<any>
}
