const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Visita', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    url_complet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'visitas',
    timestamps: false
  });
};