import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { GetAllPajamasUseCase } from "src/use-cases/pajamas/get-all-pajamas-use-case";
import { z } from "zod";

export async function getAllPajamas(request: FastifyRequest, reply: FastifyReply) {
    const getAllPajamasQuerySchema = z.object({
        page: z.coerce.number().int().positive().optional(),

        perPage: z.coerce.number().int().positive().optional(),
    }).refine(data => {
        if (data.page && !data.perPage) {
            data.perPage = 10;
        }

        if (!data.page && data.perPage) {
            data.page = 1;
        }

        return true;
    }, {
        message: "Invalid Query Params"
    });

    const getAllPajamasQuery = getAllPajamasQuerySchema.parse(request.query);

    const getAllPajamasInput: Record<string, number> = {};

    if (getAllPajamasQuery.page && getAllPajamasQuery.perPage) {
        getAllPajamasInput.skipQuantity = (getAllPajamasQuery.page - 1) * getAllPajamasQuery.perPage;
        getAllPajamasInput.itemsPerPage = getAllPajamasQuery.perPage;
    }
    
    const prismaPajamasRepository = new PrismaPajamasRepository();
    const getAllPajamasUseCase = new GetAllPajamasUseCase(prismaPajamasRepository);

    try {
        const allPajamasPaginatedResponse = await getAllPajamasUseCase.execute(getAllPajamasInput);

        if (allPajamasPaginatedResponse.meta) {
            return reply.status(200).send({
                pajamas: allPajamasPaginatedResponse.pajamas,
                meta: {
                    ...allPajamasPaginatedResponse.meta,
                    currentPage: getAllPajamasQuery.page,
                    perPage: getAllPajamasQuery.perPage
                }
            });
        } else {
            return reply.status(200).send({ pajamas: allPajamasPaginatedResponse.pajamas });
        }

    } catch (error) {
        throw error;
    }
}
