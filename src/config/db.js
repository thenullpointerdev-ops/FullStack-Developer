import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is missing. Add it to your .env file before starting the server.');
}

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});


const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma")
    } catch (error) {
        console.error(`DataBase connection error: ${error.message}`)
        // process.exit(1) : it exit from DB or node js imidatly when an error happen
        process.exit(1)
    }
}


const disconnectDB = async () => {
    await prisma.$disconnect();
}


export { prisma, connectDB, disconnectDB }
