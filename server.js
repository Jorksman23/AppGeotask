import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './db/conexion.js';
import { PORT } from './config/config.js';
import AuthRouter from './router/AuthRouter.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', AuthRouter);
// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 API GeoTask funcionando correctamente');
});

// Conexión a BD y servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ alter: false }); // pon alter: true si quieres forzar actualización

    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
  }
};

startServer();

