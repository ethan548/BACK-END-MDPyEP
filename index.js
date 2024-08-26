import connectionPrisma from './prisma_database.js'
import app from './app.js'
import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config();

connectionPrisma();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
