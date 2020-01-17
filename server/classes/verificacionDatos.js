'use strict'
const validator = require('validator');

class VerificacionDatos{
    static verifDatosPago(datos){
        let {nombre, correo, tarjeta, fechatarjeta, cvctarjeta} = datos;

        let errores = [];
        if(validator.isEmpty(nombre)){
            errores.push({mensaje: 'Agrega tu nombre'});
        }
        if(validator.isEmpty(correo)){
            errores.push({mensaje: 'Agrega tu correo'});
        }
        if(!validator.isEmail(correo)){
            errores.push({mensaje: 'El correo tiene que ser de formato email'});
        }
        return errores;
    }

    static verifDatosTestimonial(datos){
        let {nombre, correo, mensaje} = datos;
        let errores = [];
        if(validator.isEmpty(nombre)){
            errores.push({mensaje: 'Agrega tu nombre'});
        }
        if(validator.isEmpty(correo)){
            errores.push({mensaje: 'Agrega tu correo'});
        }
        if(!validator.isEmail(correo)){
            errores.push({mensaje: 'El correo tiene que ser de formato email'});
        }
        if(validator.isEmpty(mensaje)){
            errores.push({mensaje: 'Agrega tu mensaje'});
        }
        return errores;
    }
}

module.exports = {
    VerificacionDatos
}