'use strict'

const nodemailer = require('nodemailer');

/**
 * Classe para gestionar el envio de correo
 */
class Correo{

    async envioCorreo(destinatario, objeto, mensaje){
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
        to: destinatario,
        subject: objeto,
        html: mensaje
      })
      return info;
    }
}

module.exports = {
    Correo
}