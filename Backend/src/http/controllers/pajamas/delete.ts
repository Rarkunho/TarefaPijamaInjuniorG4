import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { DeletePajamaUseCase } from "src/use-cases/pajamas/delete-pajama-use-case";
import { z } from "zod";

export async function deletePajama(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        pajamaId: z.string().uuid()
    });

    const { pajamaId } = getParamsSchema.parse(request.params);

    try {
        const prismaPajamasRepository = new PrismaPajamasRepository();
        const deletePajamaUseCase = new DeletePajamaUseCase(prismaPajamasRepository);
        const pajama = await deletePajamaUseCase.execute({ pajamaId });

        return reply.status(204).send(pajama);

    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
