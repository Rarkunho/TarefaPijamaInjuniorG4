import { PajamaSizes } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasSizeRepository } from "src/repositories/prisma/prisma-pajama-size-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { GetPajamaSizeByPajamaIdUseCaseRequest, GetPajamaSizeByPajamaIdUseCaseUseCase } from "src/use-cases/pajama-sizes/get-pajama-size-by-pajama-id";
import { z } from "zod";

export async function getPajamaSizeByPajamaId(request: FastifyRequest, reply: FastifyReply) {
    const getPajamaSizeByPajamaIdParamsSchema = z.object({
        pajamaId: z.string().nonempty().uuid(),
        size: z.enum(Object.values(PajamaSizes) as [string, ...string[]])
    });

    const { pajamaId, size } = getPajamaSizeByPajamaIdParamsSchema.parse(request.params);

    const prismaPajamasSizeRepository = new PrismaPajamasSizeRepository();
    const getPajamaSizeByPajamaIdUseCaseUseCase = new GetPajamaSizeByPajamaIdUseCaseUseCase(prismaPajamasSizeRepository);

    try {
        const pajamaSizeResponse = await getPajamaSizeByPajamaIdUseCaseUseCase.execute({ pajamaId: pajamaId, size: size } as GetPajamaSizeByPajamaIdUseCaseRequest);

        return reply.status(200).send({
            status: "success",
            data: pajamaSizeResponse.pajamaSize
        });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                status: "error",
                message: error.message
            });
        }

        throw error;
    }
}
