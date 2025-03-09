import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { ZodError } from "zod";

export const app = fastify();

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

app.setErrorHandler(async (error, _, reply) => {
    if (error instanceof ZodError) {
        return await reply.status(400).send({ message: 'Validation Error', issues: error.format() });
    }

    console.error("Internal Error:", error.message);
    return await reply.status(500).send({ message: 'Internal Server Error' });
});

