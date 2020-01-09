const Testimonial = require('../models/Testimoniales');

const validator = require('validator');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()

    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.agregarTestimonial = async (req, res) => {
    let {nombre, correo, mensaje} = req.body;

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