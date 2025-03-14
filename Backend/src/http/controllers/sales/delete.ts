import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { DeleteSaleUseCase } from "src/use-cases/sales/delete-sale-use-case";
import { z } from "zod";

export async function deleteSale(request: FastifyRequest, reply: FastifyReply) {
    const deleteParamsSchema = z.object({
        saleId: z.string()
            .nonempty("Sale ID cannot be empty")
            .uuid("Sale ID must be a valid UUID")
    });

    const { saleId } = deleteParamsSchema.parse(request.params);

    const prismaSalesRepository = new PrismaSalesRepository();
    const prismaAddressRepository = new PrismaAddressRepository();
    const deleteSaleUseCase = new DeleteSaleUseCase(prismaSalesRepository, prismaAddressRepository);

    try {
        await deleteSaleUseCase.execute({ id: saleId });

        return reply.status(204).send();

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
