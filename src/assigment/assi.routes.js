'use strict'

import {Router} from 'express'
import {isStudent, isTeacher, validateJwt} from '../middlewares/validar-role.js'
import { assingCourse, eliminarAsignacionCurso, searchCoursesByStudent, test} from './assi.controller.js';


const api = Router();
api.get('/test', test)
api.post('/assingCourse',[validateJwt, isStudent], assingCourse)
api.get('/searchCoursesByStudent/:id',[validateJwt, isStudent], searchCoursesByStudent)
api.delete('/eliminate',[validateJwt, isStudent], eliminarAsignacionCurso)


export default api