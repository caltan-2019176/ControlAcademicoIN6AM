'use strict '
import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const isTeacher = async(req, res, next)=>{
    try {
        let {user} = req
        if(!user || user.role !== 'TEACHER_ROLE') return res.status(403).send({message: `You do not have acces | username: ${user.username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(403).send({message: 'Unathorized role'})
    }
}

export const isStudent = async(req, res, next)=>{
    try {
        let {user} = req
        if(!user || user.role !== 'STUDENT_ROLE') return res.status(403).send({message: `You do not have acces | username: ${student.username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(403).send({message: 'Unathorized role'})
    }
}



export const validateJwt = async(req, res, next) =>{
    try {
        //varible de entorno
        let secretKey = process.env.SECRET_KEY  
        //obtener el token
        let {token} = req.headers
        //verificar si viene
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //obtner el uid del usuario
        let {uid} = jwt.verify(token, secretKey)
        //validar si aun existe en la Base de datos
        let user = await User.findOne({_id: uid})
        if(!user)  return res.status(404).send({message: 'user not found - Unauthorized '})
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message:  'Invalid token'})
    }

}

