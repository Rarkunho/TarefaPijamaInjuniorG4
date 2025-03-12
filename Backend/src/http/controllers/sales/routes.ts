import { FastifyInstance } from "fastify";
import { createSale } from "./create";
import { deleteSale } from "./delete";
import { getSaleInfo } from "./get-sale-info";

export function saleRoutes(app: FastifyInstance) {
    app.get('/sales/:saleId', getSaleInfo);
    app.post('/sales', createSale);
    app.delete('/sales/:saleId', deleteSale);
}
