import { FastifyInstance } from "fastify";
import { createSale } from "./create";

export function saleRoutes(app: FastifyInstance) {
    app.post('/sales', createSale);
}
