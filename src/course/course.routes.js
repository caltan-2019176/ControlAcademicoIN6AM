'use strict'

import {Router} from 'express'
import { addCourse, deleteCourse, searchCourse, test, updateCourse } from './course.controller.js';
import {isStudent, isTeacher, validateJwt} from '../middlewares/validar-role.js'

const api = Router();

api.get('/test', test)
api.post('/addCourse', [validateJwt, isTeacher], addCourse)
api.delete('/delte/:id', [validateJwt, isTeacher], deleteCourse)
api.get('/get', [validateJwt, isTeacher], searchCourse)
api.put('/update/:id', [validateJwt, isTeacher],updateCourse)

export default api