import { PajamaGender, PajamaSeason, PajamaType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { GetAllPajamasUseCase, GetAllPajamasUseCaseRequest } from "src/use-cases/pajamas/get-all-pajamas-use-case";
import { z } from "zod";

export async function getAllPajamas(request: FastifyRequest, reply: FastifyReply) {
    const getAllPajamasQuerySchema = z.object({
        page: z.coerce.number()
            .int("Page must be an integer")
            .positive("Page must be a positive number")
            .optional(),

        perPage: z.coerce.number()
            .int("PerPage must be an integer")
            .positive("PerPage must be a positive number")
            .optional(),

        favorite: z.string()
            .transform((val, ctx) => {
                if (val === 'true') return true;
                if (val === 'false') return false;

                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid boolean value for favorite. Expected "true" or "false"',
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
                    message: 'Invalid boolean value for onSale. Expected "true" or "false"',
                });

                return z.NEVER;
            })
            .optional(),

        gender: z.enum(Object.values(PajamaGender) as [string, ...string[]])
            .optional()
            .refine(val => Object.values(PajamaGender).includes(val as PajamaGender), {
                message: 'Invalid gender. Expected one of: ' + Object.values(PajamaGender).join(', '),
            }).optional(),

        type: z.enum(Object.values(PajamaType) as [string, ...string[]])
            .optional()
            .refine(val => Object.values(PajamaType).includes(val as PajamaType), {
                message: 'Invalid pajama type. Expected one of: ' + Object.values(PajamaType).join(', '),
            }).optional(),

        season: z.enum(Object.values(PajamaSeason) as [string, ...string[]])
            .optional()
            .refine(val => Object.values(PajamaSeason).includes(val as PajamaSeason), {
                message: 'Invalid pajama season. Expected one of: ' + Object.values(PajamaSeason).join(', '),
            }).optional(),

    }).refine(data => {
        if (data.page !== undefined && data.perPage === undefined) {
            data.perPage = 10;
        }

        if (data.page === undefined && data.perPage !== undefined) {
            data.page = 1;
        }

        return true;
    }, {
        message: "Invalid Query Params: Either both page and perPage must be provided, or at least one should be set.",
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
