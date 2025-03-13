import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { GetAllPajamasUseCase } from "src/use-cases/pajamas/get-all-pajamas-use-case";

export async function getAllPajama(request: FastifyRequest, reply: FastifyReply) {
    const prismaPajamasRepository = new PrismaPajamasRepository();
    const getAllPajamasUseCase = new GetAllPajamasUseCase(prismaPajamasRepository);

    try {
        const allPajamas = await getAllPajamasUseCase.execute();

        return reply.status(200).send({
            status: "success",
            data: allPajamas
        });

    } catch (error) {
        throw error;
    }
}
