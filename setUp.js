import User from './src/user/user.model.js'
const crearProfesor = async () => {
    try {

   //   let  profesorExistente = await User.find({ _role: 'TEACHER_ROLE' });
    //  if (!profesorExistente) {
     
        let nuevoProfesor = new User({
          name: 'Carlos',
          email: 'Carlos@example.com',
          username: 'caralt',
          password: '12345678',
          phone: '12352602',
          role: 'TEACHER_ROLE'
        });
  
        // Guarda el nuevo profesor 
        await nuevoProfesor.save();
        console.log('teacher register correctly');
      //} else {
        //console.log('Alredy exist Teacher.');
      //}
    } catch (error) {
      console.error('Fail create teacher:', error);
    }
  };
  
  crearProfesor();