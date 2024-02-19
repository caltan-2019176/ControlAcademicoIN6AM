'use strict'

import User from './user.model.js'
import {encrypt, checkPassword} from '../utils/validatos.js'
import { generarjwt } from '../utils/jwt.js'

export const test = async (req, res)=>{
    console.log('test is running User')
    return res.send({message: 'Test is running User'})
}

export const createTeacherDefault = async(req, res)=>{
    try {
        let  profesorExistente = await User.find({ _role: 'TEACHER_ROLE' });
          if (!profesorExistente) {
        passwordD = await encrypt('12345678')
        let nuevoProfesor = new User({
            name: 'Carlos',
            email: 'Carlos@example.com',
            username: 'caralt',
            password: passwordD,
            phone: '12352602',
            role: 'TEACHER_ROLE'
          });
        let user = new User(data)
        await user.save()
        console.log('teacher register correctly');
        } else {
        console.log('Alredy exist Teacher.');
        }

    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error registering teacher', error: error})
    }
}

export const login = async(req, res) =>{
    try {
        let {username, password} = req.body
        let user = await User.findOne({username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username, 
                name:  user.name,
                role: user.role 
            }
            //Generar el token 
            let token = await generarjwt(loggedUser)
            //Responder al usuario 
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser, token})
        }
        if(!user) return res.status(404).send({message: 'user not found'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const userAdd = async(req, res) =>{
    try {
        let data = req.body
        console.log(data)
        data.password = await encrypt(data.password)
        data.role = 'STUDENT_ROLE'
        let user = new User(data)
        await user.save()
        return res.send({message: `Registered successfully, can be logged with username ${user.username}`})

    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error registering user', error: error})
    }
}

export const deleteUser = async (req, res) =>{
    try {
        
        let{id} = req.params
        let deletedUser =  await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'User not found and not deleted'})
        return res.send({message: `User ${deletedUser.name} deleted successfully`})

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting User', error: error })
    }
}

export const update = async (req, res) =>{
    try {
        let { id } = req.params
        let data = req.body
        let update =  checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        //Actualizar 
        let updateUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            {new: true} 
        )
        if (!updateUser) return res.status(401).send({ message: 'User not found' })
        return res.send({ message: 'User update', updateUser })
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `username ${error.keyValue.username} is alredy taken ` })
        return res.status(500).send({ message: 'Error updating' })
    }


}

