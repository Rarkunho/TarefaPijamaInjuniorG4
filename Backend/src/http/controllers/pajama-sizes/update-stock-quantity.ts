import { PajamaSizes } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasSizeRepository } from "src/repositories/prisma/prisma-pajama-size-repository";
import { PajamaSizeUpdateFailedError } from "src/use-cases/errors/pajama-size-update-failed-error";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { UpdatePajamaSizeQuantityUseCase } from "src/use-cases/pajama-sizes/update-quantity-pajama-size-use-case";
import { z } from "zod";

export async function updateStockQuantity(request: FastifyRequest, reply: FastifyReply) {
    const updateStockQuantityParamsSchema = z.object({
        pajamaId: z.string().uuid().nonempty(),
        size: z.enum(Object.values(PajamaSizes) as [string, ...string[]])
    });

    const updateStockQuantityBodySchema = z.object({
        quantity: z.coerce.number().int().min(0)
    });

    const updateStockQuantityParams = updateStockQuantityParamsSchema.parse(request.params);
    const updateStockQuantityBody = updateStockQuantityBodySchema.parse(request.body);

    const prismaPajamasSizeRepository = new PrismaPajamasSizeRepository();
    const updateStockQuantityUseCase = new UpdatePajamaSizeQuantityUseCase(prismaPajamasSizeRepository);

    try {
        const updatedPajamaSizeResponse = await updateStockQuantityUseCase.execute({
            pajamaId: updateStockQuantityParams.pajamaId,
            size: updateStockQuantityParams.size as PajamaSizes,
            updateData: updateStockQuantityBody.quantity
        });

        return reply.status(200).send({
            status: "success",
            data: updatedPajamaSizeResponse.pajamaSize
        });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                status: "error",
                message: error.message
            });
        }

        if (error instanceof PajamaSizeUpdateFailedError) {
            return reply.status(500).send({
                status: "error",
                message: error.message
            });
        }

        throw error;
    }
}
