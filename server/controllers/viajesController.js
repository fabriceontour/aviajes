'use strict'
/* Importacion de los modulos necesarios */
const Viaje = require('../models/Viajes');
const Client = require('../models/Clients');
const Pago = require('../models/Pagos');

/* Importacion de las classes necesarias */
const {VerificacionDatos} = require('../classes/verificacionDatos');
const {Correo} = require('../classes/correo');

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
  const errores = VerificacionDatos.verifDatosPago(req.body);
  let {nombre, correo, tarjeta, fechatarjeta, cvctarjeta} = req.body;
  
  if(errores.length === 0){
    const client = await Client.create({
      nombre,
      correo
    })

    const pago = await Pago.create({
      id_cliente: client.dataValues.id,
      id_viaje: req.params.id
    })

    const destinatario = client.dataValues.correo;
    const objeto = `Confirmacion reservacion: ${pago.dataValues.id}`;
    const mensaje = `<h1>Reservacion confirmada</h1><ul><li>Numero de reservacion: ${pago.dataValues.id}</li><li>Fecha de reservacion: ${pago.dataValues.date}</li></ul><p>Gracias por su confianza</p>`;
    let envioCorreo = new Correo();
    const info = await envioCorreo.envioCorreo(destinatario, objeto, mensaje);

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