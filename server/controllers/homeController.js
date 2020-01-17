const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

exports.consultasHomepage = async (req, res) => {
    const viajes = await Viaje.findAll({
        where: {
          disponibles: {
            [Op.gt]: 0
          }
        }
      }, {limit: 3});
    const testimoniales = await Testimonial.findAll({limit: 3});
    
    res.render('index', {
        pagina: 'Proximos Viajes',
        class: 'home',
        viajes,
        testimoniales
    })
}