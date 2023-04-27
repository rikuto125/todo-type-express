import { Task } from '../domain/Task'
import { IDBConnection } from './db/IDBConnection'

export class TaskDriver {
    private connection: any

    constructor(connection: IDBConnection) {
        this.connection = connection
    }

    async find(id: number): Promise<any> {
        const result = await this.connection.execute(
            'select * from tasks where id = ?',
            id
        )

        return result
    }

    async findAll(): Promise<any> {
        const result = await this.connection.execute('select * from tasks')
        return result
    }

    async create(content: String): Promise<any> {
        const result = await this.connection.execute(
            'insert into tasks (content) values (?)',
            content
        )
        return result
    }

    async update(task: Task): Promise<any> {
        const result = this.connection.execute(
            'update tasks set status = ? where id = ?',
            [task.status.value, task.id.value]
        )
        return result
    }

    async delete(id: number): Promise<any> {
        const result = await this.connection.execute(
            'delete from tasks where id = ?',
            id
        )
        return result
    }
}