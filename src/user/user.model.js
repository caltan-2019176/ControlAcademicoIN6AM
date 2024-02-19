'use strict'
import {Schema, model} from 'mongoose'
const userSchema =  Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
        required: true
    }
}, {
    versionKey: false //desactivar el _v (versión del documento)
})
export default model('user', userSchema)