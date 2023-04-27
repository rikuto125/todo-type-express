import express = require('express')
import { TaskUseCase } from '../usecases/TaskUseCase'
import { TaskGateway } from '../gateway/TaskGateway'
import { TaskResource } from '../rest/TaskResource'
import { MysqlConnection } from './db/MysqlConnection'
import { TaskDriver } from './TaskDriver'

const mysqlConnection = new MysqlConnection()
const taskDriver = new TaskDriver(mysqlConnection)
const taskGateway = new TaskGateway(taskDriver)
const taskUsecase = new TaskUseCase(taskGateway)
const taskResource = new TaskResource(taskUsecase)

const router = express.Router()

router.get('/tasks', async (req: express.Request, res: express.Response) => {
    const results = await taskResource.findAllTasks(req, res)
    res.send(results)
})

router.get(
    '/tasks/:id',
    async (req: express.Request, res: express.Response) => {
        const result = await taskResource.findTask(req, res)

        res.send(result)
    }
)

router.post('/tasks', async (req: express.Request, res: express.Response) => {
    const result = await taskResource.createTask(req, res)
    res.send(result)
})

router.patch(
    '/tasks/:id',
    async (req: express.Request, res: express.Response) => {
        const result = await taskResource.updateTask(req, res)
        res.send(result)
    }
)

router.delete(
    '/tasks/:id',
    async (req: express.Request, res: express.Response) => {
        const result = await taskResource.deleteTask(req, res)
        res.send(result)
    }
)

export default router