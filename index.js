const express = require('express');
const app = express();
const { sequelize } = require('./models');
const visitaRoutes = require('./routes/visitaRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', visitaRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });