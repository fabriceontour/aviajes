const Viaje = require('../models/Viajes');
const Client = require('../models/Clients');
const Pago = require('../models/Pagos');

const validator = require('validator');
const nodemailer = require('nodemailer');


exports.mostrarViajes = async (req, res) => {
    const viajes = await  Viaje.findAll()
    res.render('viajes', {
      pagina: 'Proximos Viajes',
      viajes
    })
}

exports.mostrarViaje = async (req, res) => {
    const viaje = await Viaje.findAll({
        where: {
          id: req.params.id
        }
      })
    res.render('viaje', {
      viaje
    })
}

exports.comprarViaje = async (req, res) => {
  const viaje = await Viaje.findAll({
      where: {
        id: req.params.id
      }
    })
  res.render('comprar', {
    viaje
  })
}

exports.realizarPago = async (req, res) => {
  let {nombre, correo, tarjeta, fechatarjeta, cvctarjeta} = req.body;

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
  if(validator.isEmpty(tarjeta)){
    errores.push({mensaje: 'Agrega tu numero tarjeta'});
  }
  if(validator.isEmpty(fechatarjeta)){
    errores.push({mensaje: 'Agrega la fecha de la tarjeta'});
  }
  if(validator.isEmpty(cvctarjeta)){
    errores.push({mensaje: 'Agrega el cvc de la tarjeta'});
  }
  if(!validator.isLength(cvctarjeta, [{min: 0, max: 3}])){
    errores.push({mensaje: 'Numero CVC no correcto'});
  }

  if(errores.length === 0){
    const client = await Client.create({
      nombre,
      correo
    })

    const pago = await Pago.create({
      id_cliente: client.dataValues.id,
      id_viaje: req.params.id
    })

    const transporter = nodemailer.createTransport({
      host: 'mail.fabricemaigne.com',
      port: 587,
      secure: false,
      auth: {
        user: 'contact@fabricemaigne.com',
        pass: 'Ultras_1972'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = await transporter.sendMail({
      from: "'AGENCIA DE VIAJES' <contact@fabricemaigne.com>",
      to: client.dataValues.correo,
      subject: `Confirmacion reservacion: ${pago.dataValues.id}`,
      text: `Hola, Le informamos que tiene la reservacion ${pago.dataValues.id}`
    })

    res.render('pagado', {
      ref: pago.dataValues.id,
      correo: client.dataValues.correo
    })
  }else{
    res.render('comprar', {
      errores,
      nombre,
      correo,
      tarjeta,
      fechatarjeta,
      cvctarjeta
    })
  }
}