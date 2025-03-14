import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasSizeRepository } from "src/repositories/prisma/prisma-pajama-size-repository";
import { GetAllPajamaSizeByPajamaIdUseCaseUseCase } from "src/use-cases/pajama-sizes/get-all-pajama-size-by-pajama-id-use-case";
import { z } from "zod";

export async function getAllPajamaSizeByPajamaId(request: FastifyRequest, reply: FastifyReply) {
    const getAllPajamaSizeByPajamaIdParamsSchema = z.object({
        pajamaId: z.string()
            .nonempty("Pajama ID cannot be empty")
            .uuid("Pajama ID must be a valid UUID")
    });

    const { pajamaId } = getAllPajamaSizeByPajamaIdParamsSchema.parse(request.params);

    const prismaPajamasSizeRepository = new PrismaPajamasSizeRepository();
    const getAllPajamaSizeByPajamaIdUseCaseUseCase = new GetAllPajamaSizeByPajamaIdUseCaseUseCase(prismaPajamasSizeRepository);

    try {
        const allPajamaSizesResponse = await getAllPajamaSizeByPajamaIdUseCaseUseCase.execute({ pajamaId: pajamaId });

        return reply.status(200).send(allPajamaSizesResponse.pajamaSize);

    } catch (error) {
        throw error;
    }
}
