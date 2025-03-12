import { FastifyInstance } from "fastify";
import { createSale } from "./create";
import { deleteSale } from "./delete";
import { getSaleInfo } from "./get-sale-info";
import { updateSale } from "./update";

export function saleRoutes(app: FastifyInstance) {
    app.get('/sales/:saleId', getSaleInfo);
    app.delete('/sales/:saleId', deleteSale);
    app.post('/sales', createSale);
    app.patch('/sales/:saleId', updateSale);
}
