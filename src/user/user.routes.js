'use strict'

import {Router} from 'express'
import{validateJwt, isStudent, isTeacher} from '../middlewares/validar-role.js'
import {  deleteUser, login, test, update, updateRole, userAdd } from './user.controller.js';

const api = Router();

api.get('/test',[validateJwt], test)
api.post('/userAdd', userAdd)
api.delete('/deleteUser',[validateJwt, isStudent], deleteUser)
api.put('/update',[validateJwt], update )
api.post('/login', login)
api.put('/updateRole/:id', [validateJwt, isTeacher], updateRole)

export default api