import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetPajamaUseCase } from "src/use-cases/pajamas/get-pajama-use-case";
import { z } from "zod";

export async function getPajama(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        pajamaId: z.string().uuid()
    });

    const { pajamaId } = getParamsSchema.parse(request.params);

    try {
        const prismaPajamasRepository = new PrismaPajamasRepository();
        const getPajamaUseCase = new GetPajamaUseCase(prismaPajamasRepository);
        const getPajamaResponse = await getPajamaUseCase.execute({ pajamaId });

        return reply.status(200).send(getPajamaResponse.pajama);

    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
