'use strict'
/* Importacion de los modulos necesarios */
const Viaje = require('../models/Viajes');
const Client = require('../models/Clients');
const Pago = require('../models/Pagos');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

/* Importacion de las classes necesarias */
const {VerificacionDatos} = require('../classes/verificacionDatos');
const {Correo} = require('../classes/correo');

exports.mostrarViajes = async (req, res) => {
    const viajes = await  Viaje.findAll(
      {
        where: {
          disponibles: {
            [Op.gt]: 0
          }
        }
      }
    )
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
  let {nombre, correo} = req.body;
  
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
    await actualizarDisponibles(req.params.id)

    res.render('pagado', {
      ref: pago.dataValues.id,
      correo: client.dataValues.correo
    })
  }else{
    res.render('comprar', {
      errores,
      nombre,
      correo
    })
  }
}

async function actualizarDisponibles(id_viaje) {
  const viajeSelect = await Viaje.findAll({
    where: {
      id: id_viaje
    }
  })

  const dispo = Viaje.update({
    disponibles: viajeSelect[0].dataValues.disponibles - 1,
      }, {
        where: {
          id: id_viaje
        }
  });

}