import { FastifyInstance } from "fastify";
import { updateStockQuantity } from "./update-stock-quantity";
import { getAllPajamaSizeByPajamaId } from "./get-all-pajama-size-by-pajama-id";

export function pajamaSizeRoutes(app: FastifyInstance) {
    app.get('/pajama-size/:pajamaId', getAllPajamaSizeByPajamaId);
    app.patch('/pajama-size/:pajamaId/size/:size/stock', updateStockQuantity);
}
