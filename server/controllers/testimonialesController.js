'use strict'
const Testimonial = require('../models/Testimoniales');
const {VerificacionDatos} = require('../classes/verificacionDatos');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()

    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.agregarTestimonial = async (req, res) => {
    let {nombre, correo, mensaje} = req.body;
    const errores = VerificacionDatos.verifDatosTestimonial(req.body);
    if(errores.length > 0){
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        })
    }else{
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then( testimonial => res.redirect('/testimoniales'))
        .catch( error => console.log(error));
    }
}