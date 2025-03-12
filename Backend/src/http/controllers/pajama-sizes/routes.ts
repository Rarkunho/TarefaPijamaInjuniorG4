import { FastifyInstance } from "fastify";
import { updateStockQuantity } from "./update-stock-quantity";

export function pajamaSizeRoutes(app: FastifyInstance) {
    app.patch('/pajama-size/:pajamaId/size/:size/stock', updateStockQuantity);
}
