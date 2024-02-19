'use strict'

import {Router} from 'express'
import{validateJwt, isStudent, isTeacher} from '../middlewares/validar-role.js'
import {  deleteUser, login, test, update, userAdd } from './user.controller.js';

const api = Router();

api.get('/test',[validateJwt], test)
api.post('/userAdd', userAdd)
api.delete('/deleteUser/:id',[validateJwt, isStudent], deleteUser)
api.put('/update/:id',[validateJwt], update )
api.post('/login', login)


export default api