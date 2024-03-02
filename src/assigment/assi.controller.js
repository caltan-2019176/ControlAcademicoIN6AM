'use strict'
import AsignacionCurso from './assi.model.js'
import User from '../user/user.model.js'
export const test = async (req, res) => {
  console.log('test is running ASSI')
  return res.send({ message: 'Test is running ASSI' })
}


export const assingCourse = async (req, res) => {
  try {
    let data = req.body;
    data.student = req.user._id
    console.log(data.student)
    // Verificar si el estudiante ya esta asignado a este curso
    const existingAssignment = await AsignacionCurso.findOne({ course: data.course, student: data.student });
    if (existingAssignment) {
      return res.status(400).send({ message: 'The student is already assigned to this course' });
    }

    // Verificar si el estudiante ya está asignado a 3 cursos
    const assignedCoursesCount = await AsignacionCurso.countDocuments({ student: data.student });
    if (assignedCoursesCount >= 3) {
      return res.status(400).send({ message: 'You have already been assigned to 3 courses' });
    }

    // Crear y guardar la asignación del curso
    const newAssignment = new AsignacionCurso(data);
    await newAssignment.save();

    return res.send({ message: 'Correctly assigned to the course' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Not assigned correctly to the course', err: err });
  }
}
// Controlador para eliminar una asignación de curso
export const eliminarAsignacionCurso = async (req, res) => {
  try {
    let { id } = req.params
    let deletedAssigment = await AsignacionCurso.findOne({ _id: id })
    if (!deletedAssigment) return res.status(404).send({ message: 'Assigment not found and not deleted' })
    await AsignacionCurso.findByIdAndDelete(id);
    return res.send({ message: `Assigment deleted successfully` })

  } catch (error) {
    console.error('Failed Delete Assigment:', error);
    return res.status(500).json({ error: 'Failed Delete Assigment' });
  }
}

export const searchCoursesByStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar todas las asignaciones de curso del usuario
    const asignaciones = await AsignacionCurso.find({ student: id }).populate('course');


    return res.send({asignaciones});
  } catch (error) {
    console.error('Error al obtener los cursos asignados al usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const getAssigment = async (req, res) => {
  try {
    const asignaciones = await AsignacionCurso.find().populate('course', ['nameCourse', 'description', 'finishDate', 'teacher']).populate('student', ['name', 'username'])
    if(!asignaciones) return res.status(404).send({message: 'assigments not found'})
    return res.send({asignaciones});
  } catch (error) {
    console.error('Error al obtener los cursos asignados al usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
