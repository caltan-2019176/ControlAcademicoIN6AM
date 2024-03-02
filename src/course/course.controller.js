'use strict'
import Course from './course.model.js'
import Asignacion from '../assigment/assi.model.js'
import {encrypt, checkPassword} from '../utils/validatos.js'

export const test = async (req, res)=>{
    console.log('test is running Course')
    return res.send({message: 'Test is running Course'})
}

export const addCourse = async(req, res) =>{
    try {
        let data = req.body
        console.log(data)
        let course = new Course(data)
        await course.save()
        return res.send({message: `Registered successfully, can be logged with username ${course.nameCourse}`})

    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error registering course', error: error})
    }
}

export const searchCourse = async (req, res) => {
    try {
        // Obtener el parámetro de búsqueda
        const { teacherId } = req.body;

        // Buscar cursos por el ID del profesor
        const courses = await Course.find({ teacher: teacherId }).populate('teacher', ['name', 'surname', 'username', 'email', 'phone', 'role']);

        // Validar la respuesta
        if (!courses.length) return res.status(404).send({ message: 'Courses not found' });

        // Responder si todo sale bien
        return res.send({ message: 'Courses found', courses });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error searching courses' });
    }

}

export const deleteCourse = async (req, res) =>{
    try {
        
        let{id} = req.params
        let deletedCourse =  await Course.findOne({_id: id})
        if(!deletedCourse) return res.status(404).send({message: 'Course not found and not deleted'})
        await Asignacion.deleteMany({ course: id });
        await Course.findByIdAndDelete(id);
        return res.send({message: `Course ${deletedCourse.nameCourse} deleted successfully`})

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting Course', error: error })
    }


}

export const updateCourse = async(req, res) =>{
    try {
        const { id } = req.params;
        const data = req.body;
    
        // Verificar si el curso existe
        const curso = await Course.findById(id);
        if (!curso) {
          return res.status(404).send({ error: 'El curso no existe' });
        }
    
        let updateCourse = await Course.findOneAndUpdate(
            { _id: id },
            data,
            {new: true} 
        )
        // Actualizar el curso asignado a los alumnos
        await Asignacion.updateMany({ course: id }, { $set: { course: id } });
    
        return res.send(updateCourse);
      } catch (error) {
        console.error('Fail edit course:', error);
        return res.status(500).json({ error: 'Fail edit course' });
      }
}