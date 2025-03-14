import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaSalePajamasRepository } from "src/repositories/prisma/prisma-sale-pajamas-repository";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetSaleInfoUseCase } from "src/use-cases/sales/get-sale-info-use-case";
import { z } from "zod";

export async function getSaleInfo(request: FastifyRequest, reply: FastifyReply) {
    const getSaleInfoParamsSchema = z.object({
        saleId: z.string()
            .nonempty("Sale ID cannot be empty")
            .uuid("Sale ID must be a valid UUID")
    });

    const { saleId } = getSaleInfoParamsSchema.parse(request.params);

    const prismaSalesRepository = new PrismaSalesRepository();
    const prismaAddressRepository = new PrismaAddressRepository();
    const prismaSalePajamasRepository = new PrismaSalePajamasRepository();

    const getSaleSaleInfoUseCase = new GetSaleInfoUseCase(
        prismaSalesRepository,
        prismaAddressRepository,
        prismaSalePajamasRepository
    );

    try {
        const saleInfoResponse = await getSaleSaleInfoUseCase.execute({ id: saleId });

        return reply.status(200).send(saleInfoResponse.saleInfo);

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
