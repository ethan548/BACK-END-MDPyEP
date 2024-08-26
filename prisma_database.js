import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export default async function connectionPrisma() {
  try {
    await prisma.$connect();
    console.log('Connection to the database has been established successfully.');
    // Aquí puedes hacer consultas de prueba
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

