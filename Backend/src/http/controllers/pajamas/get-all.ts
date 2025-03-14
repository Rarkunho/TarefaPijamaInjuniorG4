import { PajamaGender, PajamaType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { GetAllPajamasUseCase, GetAllPajamasUseCaseRequest } from "src/use-cases/pajamas/get-all-pajamas-use-case";
import { z, ZodError } from "zod";

export async function getAllPajamas(request: FastifyRequest, reply: FastifyReply) {
    const getAllPajamasQuerySchema = z.object({
        page: z.coerce.number().int().positive().optional(),

        perPage: z.coerce.number().int().positive().optional(),

        favorite: z.string()
            .transform((val, ctx) => {
                if (val === 'true') return true;
                if (val === 'false') return false;

                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid boolean value. Expected \'true\' or \'false\''
                });

                return z.NEVER;
            })
            .optional(),

        onSale: z.string()
            .transform((val, ctx) => {
                if (val === 'true') return true;
                if (val === 'false') return false;

                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid boolean value. Expected \'true\' or \'false\''
                });

                return z.NEVER;
            })
            .optional(),

        gender: z.enum(Object.values(PajamaGender) as [string, ...string[]]).optional(),

        type: z.enum(Object.values(PajamaType) as [string, ...string[]]).optional()

    }).refine(data => {
        if (data.page !== undefined && data.perPage === undefined) {
            data.perPage = 10;
        }

        if (data.page === undefined && data.perPage !== undefined) {
            data.page = 1;
        }

        return true;
    }, {
        message: "Invalid Query Params"
    });

    const { page, perPage, ...queryProps } = getAllPajamasQuerySchema.parse(request.query);

    const getAllPajamasInput = { ...queryProps } as GetAllPajamasUseCaseRequest;

    if (page !== undefined && perPage !== undefined) {
        getAllPajamasInput.skipQuantity = (page - 1) * perPage;
        getAllPajamasInput.itemsPerPage = perPage;
    }

    const prismaPajamasRepository = new PrismaPajamasRepository();
    const getAllPajamasUseCase = new GetAllPajamasUseCase(prismaPajamasRepository);

    try {
        const allPajamasPaginatedResponse = await getAllPajamasUseCase.execute(getAllPajamasInput);

        if (allPajamasPaginatedResponse.meta) {
            return reply.status(200).send({
                pajamas: allPajamasPaginatedResponse.pajamas,
                meta: {
                    currentPage: page,
                    perPage: perPage,
                    ...allPajamasPaginatedResponse.meta
                }
            });
        } else {
            return reply.status(200).send({ pajamas: allPajamasPaginatedResponse.pajamas });
        }

    } catch (error) {
        throw error;
    }
}
