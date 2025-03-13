import { FastifyInstance } from "fastify";
import { updateStockQuantity } from "./update-stock-quantity";
import { getAllPajamaSizeByPajamaId } from "./get-all-pajama-size-by-pajama-id";

export async function pajamaSizeRoutes(app: FastifyInstance) {
    app.get('/pajama-sizes/:pajamaId', getAllPajamaSizeByPajamaId);
    app.patch('/pajama-sizes/:pajamaId/:size', updateStockQuantity);
}
