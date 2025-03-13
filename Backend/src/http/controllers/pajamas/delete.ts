import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { DeletePajamaUseCase } from "src/use-cases/pajamas/delete-pajama-use-case";
import { z } from "zod";

export async function deletePajama(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = getParamsSchema.parse(request.params);

    try {
        const prismaPajamasRepository = new PrismaPajamasRepository();
        const deletePajamaUseCase = new DeletePajamaUseCase(prismaPajamasRepository);
        const pajama = await deletePajamaUseCase.execute({ id });
        
        return reply.status(204).send(pajama);

    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message });
        }
        
        throw error;
    }
}
