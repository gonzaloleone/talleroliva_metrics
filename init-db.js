const { sequelize, Page, Visita } = require('./models');

async function initDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos creada exitosamente');
    
    const examplePages = [
      { description: 'Página de inicio', url_base: 'https://example.com' },
      { description: 'Blog', url_base: 'https://example.com/blog' }
    ];
    
    for (const pageData of examplePages) {
      await Page.create(pageData);
    }
    
    console.log('Datos de ejemplo insertados');
    console.log('Base de datos SQLite inicializada en: database.sqlite');
    
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

initDatabase();