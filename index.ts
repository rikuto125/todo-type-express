import express from 'express'
import router from './infrastructure/router'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const allowedOrigins = "*"

const options: cors.CorsOptions = {
    origin: allowedOrigins
}
app.use(cors(options))

app.use('/api', router)

app.listen(3000, () => {
    console.log('listening on port 3000')
})

export default app