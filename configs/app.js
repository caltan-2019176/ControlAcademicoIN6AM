//Levantar servidor HTTP (express)
//usamos ESModules 
'use strict'

//importaciones 
import express from 'express'
import { config } from "dotenv"
import morgan from 'morgan'
import userRoutes from '../src/user/user.routes.js'
import courseRoutes from '../src/course/course.routes.js'
import assigment from '../src/assigment/assi.routes.js'

const app = express()
config()
const port = process.env.PORT || 3056

//Configuración del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))

//Declaración de rutas 
app.use('/user', userRoutes)
app.use('/course', courseRoutes)
app.use('/assigment', assigment)


//Levantar el servidor
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
