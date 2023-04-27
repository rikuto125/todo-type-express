import express from 'express'
import router from './infrastructure/router'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from "./config/db";


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const allowedOrigins = "*"

const options: cors.CorsOptions = {
    origin: allowedOrigins
}
app.use(cors(options))

app.use('/api', router)

db.migrate.latest().then(() => {
    console.log('Migrations run successfully')
}
).catch((err: any) => {
    console.log(err)
}
)

app.listen(3000, () => {
    console.log('listening on port 3000')
})

export default app