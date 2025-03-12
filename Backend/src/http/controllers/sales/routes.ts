import { FastifyInstance } from "fastify";
import { createSale } from "./create";
import { deleteSale } from "./delete";

export function saleRoutes(app: FastifyInstance) {
    app.post('/sales', createSale);
    app.delete('/sales/:saleId', deleteSale);
}
