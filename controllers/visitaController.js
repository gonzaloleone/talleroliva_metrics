const { Page, Visita } = require('../models');

exports.obtenerVisitas = async (req, res) => {
  try {
    const visitas = await Visita.findAll({
      include: [{
        model: Page,
        attributes: ['url_base', 'description']
      }],
      order: [['timestamp', 'DESC']]
    });
    res.json(visitas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las visitas' });
  }
};

exports.obtenerEstadisticas = async (req, res) => {
  try {
    const totalVisitas = await Visita.count();
    const totalPaginas = await Page.count();
    
    const visitasPorPagina = await Page.findAll({
      attributes: ['id', 'url_base', 'description'],
      include: [{
        model: Visita,
        attributes: []
      }],
      group: ['Page.id'],
      raw: true
    });
    
    res.json({
      totalVisitas,
      totalPaginas,
      visitasPorPagina
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};

exports.registrarVisita = async (req, res) => {
  try {
    const { url_complet, ip_address } = req.body;

    if (!url_complet) {
      return res.status(400).json({ error: 'Falta la URL completa' });
    }

    // Extraer dominio base
    const urlParts = url_complet.split('/');
    const url_base = urlParts[0]; // por ejemplo: "testing.com" de "testing.com/123"

    // Buscar o crear página base
    let page = await Page.findOne({ where: { url_base } });
    if (!page) {
      page = await Page.create({ url_base });
    }

    // Crear la visita
    const visita = await Visita.create({
      url_complet,
      ip_address,
      page_id: page.id
    });

    res.status(201).json(visita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la visita' });
  }
};