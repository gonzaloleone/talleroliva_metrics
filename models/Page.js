const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Page', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING
    },
    url_base: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'pages',
    timestamps: false
  });
};