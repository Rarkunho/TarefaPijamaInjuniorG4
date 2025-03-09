
import { app } from './app';
import { env } from './env/index';
import { prismaClient } from './lib/prisma';

const server = app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    console.log(`Server is Running on Port ${env.PORT}`);
    console.log(`Server is Running on Address ${address}`);
});

process.on('SIGINT', async () => {
    await prismaClient.$disconnect();
})
