import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { ZodError } from "zod";
import { userRoutes } from "./http/controllers/users/routes";
import { feedbackRoutes } from "./http/controllers/feedbacks/routes";
import { pajamaRoutes } from "./http/controllers/pajamas/routes";
import { saleRoutes } from "./http/controllers/sales/routes";
import { pajamaStockRoutes } from "./http/controllers/pajama-sizes/routes";

export const app = fastify();

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

app.setErrorHandler(async (error, _, reply) => {
    if (error instanceof ZodError) {
        return await reply.status(400).send({
            message: 'Validation Error',
            issues: error.format()
        });
    }

    console.error("Internal Error:", error.message);
    return await reply.status(500).send({ message: 'Internal Server Error' });
});

app.register(feedbackRoutes);
app.register(pajamaRoutes);
app.register(userRoutes);
app.register(saleRoutes);
app.register(pajamaStockRoutes);
