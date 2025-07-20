const { Page, Visita } = require('../models');

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