'use strict'

import {Router} from 'express'
import {isStudent, isTeacher, validateJwt} from '../middlewares/validar-role.js'
import { assingCourse, eliminarAsignacionCurso, getAssigment, searchCoursesByStudent, test} from './assi.controller.js';


const api = Router();
api.get('/test', test)
api.post('/assingCourse',[validateJwt, isStudent], assingCourse)
api.get('/searchCoursesByStudent/:id',[validateJwt, isStudent], searchCoursesByStudent)
api.delete('/eliminate/:id',[validateJwt, isStudent], eliminarAsignacionCurso)
api.get('/getAssigment', [validateJwt], getAssigment)

export default api