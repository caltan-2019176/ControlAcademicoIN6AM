//validar diferentes datos
'use strict'

import { hash, compare} from 'bcrypt'

export const encrypt = (password)=>{
    try {

        return hash(password, 10)

    } catch (error) {
        console.error(error)
        return error
    }

}


export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkUpdate = (data, id)=>{
    if(id){
        if(Object.entries(data).length === 0 ||
            data.password){
            return false
        }
        return true
    }else{
        if(Object.entries(data).length === 0 ||
            data.password ||
            data.password == ''||
            data.role ||
            data.role =='' ||
            data.course ||
            data.course ==''){
            return false
        }
        if (Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ) {
            return false
        }
        return true
    }
    
}


export const checkUpdateRole = async (data, id) => {
    if (id) {
        if (Object.entries(data).length === 0 ||
            data.username||
            data.name||
            data.email ||
            data.password ||
            data.phone ||
            data.name) {
            return false
        }
        return true
    } else {
        return false
    }
}
