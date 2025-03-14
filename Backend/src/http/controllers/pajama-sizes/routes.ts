import { FastifyInstance } from "fastify";
import { updateStockQuantity } from "./update-stock-quantity";
import { getAllPajamaSizeByPajamaId } from "./get-all-pajama-size-by-pajama-id";
import { getPajamaSizeByPajamaId } from "./get-pajama-size-by-pajama-id";

export async function pajamaStockRoutes(app: FastifyInstance) {
    app.get('/pajamas/stock/:pajamaId/:size', getPajamaSizeByPajamaId);
    app.get('/pajamas/stock/:pajamaId', getAllPajamaSizeByPajamaId);
    app.patch('/pajamas/stock/:pajamaId/:size', updateStockQuantity);
}
