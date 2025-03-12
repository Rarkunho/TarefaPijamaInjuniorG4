import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { DeleteSaleUseCase } from "src/use-cases/sales/delete-sale-use-case";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { SaleDeletionFailedError } from "src/use-cases/errors/sale-deletion-failed-error";

export async function deleteSale(request: FastifyRequest, reply: FastifyReply) {
    const deleteParamsSchema = z.object({
        saleId: z.string().uuid()
    });
    
    const { saleId } = deleteParamsSchema.parse(request.params);

    const prismaSalesRepository = new PrismaSalesRepository();
    const deleteSaleUseCase = new DeleteSaleUseCase(prismaSalesRepository);

    try {
        await deleteSaleUseCase.execute({ id: saleId });

        return await reply.status(204).send();
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return await reply.status(404).send({
                status: "error",
                message: error.message
            });
        }

        if (error instanceof SaleDeletionFailedError) {
            return await reply.status(500).send({
                status: "error",
                message: error.message
            });
        }

        throw error;
    }
}
