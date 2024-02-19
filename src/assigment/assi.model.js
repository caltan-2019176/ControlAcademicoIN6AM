'use strict'
import {Schema, model} from 'mongoose'

const assigmentSchema = Schema({
    course: { 
        type: Schema.Types.ObjectId, 
        ref: 'course', 
        required: true },
    student: { 
        type: Schema.Types.ObjectId, 
        ref: 'user', 
        required: true }
}, {
    versionKey: false //desactivar el _v (versión del documento)
})

export default model('assigment', assigmentSchema)