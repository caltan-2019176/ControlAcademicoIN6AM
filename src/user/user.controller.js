'use strict'

import User from './user.model.js'
import {encrypt, checkPassword, checkUpdate, checkUpdateRole} from '../utils/validatos.js'
import { generarjwt } from '../utils/jwt.js'

export const test = async (req, res)=>{
    console.log('test is running User')
    return res.send({message: 'Test is running User'})
}

export const createTeacherDefault = async(req, res)=>{
    try {
        let  profesorExistente = await User.findOne({ role: 'TEACHER_ROLE' });
        if (!profesorExistente) {
        let passwordD = await encrypt('12345678')
        let nuevoProfesor = new User({
            name: 'Carlos',
            email: 'carlos@example.com',
            username: 'caralt',
            password: passwordD,
            phone: '12352602',
            role: 'TEACHER_ROLE'
          });
        let user = new User(nuevoProfesor)
        await user.save()
        console.log('teacher register correctly');
        } else {
        console.log('Alredy exist Teacher.');
        }

    } catch (error) {
        console.error(error)
        console.log('fail add user')
    }
}

export const login = async(req, res) =>{
    try {
        let data = req.body
        let loginUs = await User.findOne({
            $or:[ 
                {
                    username: data.username
                },
                {
                    email: data.email
                }
            ]
        })
        if(!loginUs) return res.status(404).send({message: 'error validate username or email'})

        if(loginUs){
            if( await checkPassword(data.password, loginUs.password)){
                let loggedUser = {
                    uid: loginUs._id,
                    username: loginUs.username, 
                    name:  loginUs.name,
                    role: loginUs.role 
                }
                let token = await generarjwt(loggedUser)
                return res.send({message: `Welcome ${loggedUser.name}`, loggedUser, token})
            }
        }
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
        let data = req.body
        data._id = req.user._id
        let deletedAccount =  await User.findOneAndDelete({_id: data._id})
        if(!deletedAccount) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account ${deletedAccount.username} deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting User', error: error })
    }
}

export const update = async (req, res) =>{
    try {
        let data = req.body
        data._id = req.user._id

        let update = checkUpdate(data, data._id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        let findU = await User.findOne({_id: data._id})
        if(findU.role == 'STUDENT_ROLE'){
            data.role = 'STUDENT_ROLE' 
        }
        let updateUser = await User.findOneAndUpdate(
            { _id: data._id },
            data,
            {new: true} 
        )
        if (!updateUser) return res.status(401).send({ message: 'user not found' })
        return res.send({ message: 'user update', updateUser })

    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `username ${error.keyValue.username} is alredy taken ` })
        return res.status(500).send({ message: 'Error updating' })
    }


}

export const updateRole = async (req, res) =>{
    try {
        let {id} = req.params
        let data = req.body

        let update = checkUpdateRole(data, data._id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        let userFind =  await User.findOne({_id: id})
        if(!userFind) return res.status(404).send({message: 'user not found'})
        if(userFind.role === 'TEACHER_ROLE'){
            data.role = 'STUDEND_ROLE'
        }else{
            data.role = 'TEACHER_ROLE'
        }
        let updateUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            {new: true} 
        )
        if (!updateUser) return res.status(401).send({ message: 'user not found' })
        return res.send({ message: 'Role update', updateUser })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating role' })
    }
}