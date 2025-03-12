import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { GetSaleInfoUseCase } from "src/use-cases/sales/get-sale-info-use-case";
import { SaleInfoRetrievalFailedError } from "src/use-cases/errors/sale-info-retrieval-failed-error";

export async function getSaleInfo(request: FastifyRequest, reply: FastifyReply) {
    const getSaleInfoParamsSchema = z.object({
        saleId: z.string().uuid()
    });
    
    const { saleId } = getSaleInfoParamsSchema.parse(request.params);

    const prismaSalesRepository = new PrismaSalesRepository();
    const getSaleSaleInfoUseCase = new GetSaleInfoUseCase(prismaSalesRepository);

    try {
        const saleInfoResponse = await getSaleSaleInfoUseCase.execute({ id: saleId });
        
        return reply.status(200).send({
            status: "success",
            data: saleInfoResponse.saleInfo
        });
        
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                status: "error",
                message: error.message
            });
        }

        if (error instanceof SaleInfoRetrievalFailedError) {
            return reply.status(500).send({
                status: "error",
                message: error.message
            });
        }

        throw error;
    }
}
