import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { UpdatePajamaUseCase } from "src/use-cases/pajamas/update";
import { z } from "zod";

export async function UpdatePajama(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    });

    const updateBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        season: z.string().optional(),
        type: z.string().optional(),
        gender: z.string().optional(),
        favorite: z.boolean().optional(),
        onSale: z.boolean().optional(),
        price: z.number().optional(),
        salePercent: z.number().optional()
    });

    const { id } = updateParamsSchema.parse(request.params);
    const updateBody = updateBodySchema.parse(request.body);

    try {
        const prismaPajamasRepository = new PrismaPajamasRepository();
        const updatePajamasUseCase = new UpdatePajamaUseCase(prismaPajamasRepository);
        
        const pajama = await updatePajamasUseCase.execute({
            id,
            data: updateBody
        });

        return await reply.status(200).send(pajama);

    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return await reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
