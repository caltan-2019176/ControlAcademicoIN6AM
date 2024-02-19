'use strict'
import {Schema, model} from 'mongoose'

const courseSchema = Schema({
    nameCourse: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    moduls: {
        type: String,
        required: true
    },
    finishDate: {
        type: String,
        required: true
    }, 
    teacher: { 
        type: Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    }
}, {
    versionKey: false //desactivar el _v (versión del documento)
})

export default model('course', courseSchema)