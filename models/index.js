const sequelize = require('../config/database');
const PageModel = require('./Page');
const VisitaModel = require('./Visita');

const Page = PageModel(sequelize);
const Visita = VisitaModel(sequelize);

Page.hasMany(Visita, { foreignKey: 'page_id' });
Visita.belongsTo(Page, { foreignKey: 'page_id' });

module.exports = {
  sequelize,
  Page,
  Visita
};