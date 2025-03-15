import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repository";
import { GetAllFeedbacksUseCase, GetAllFeedbacksUseCaseRequest } from "src/use-cases/feedbacks/get-all-feedbacks-use-case";
import { z } from "zod";

export async function getAllFeedbacks(request: FastifyRequest, reply: FastifyReply) {
    const getAllQuerySchema = z.object({
        page: z.coerce.number()
            .int("Page must be an integer")
            .positive("Page must be a positive number")
            .optional(),

        perPage: z.coerce.number()
            .int("PerPage must be an integer")
            .positive("PerPage must be a positive number")
            .optional(),

        rating: z.coerce.number()
        .optional()
        .refine((value) => {
            if (value !== undefined) {
                return /^(0(\.0|\.5)?|[1-4](\.0|\.5)?|5(\.0)?)$/.test(value.toFixed(1));
            }
            return true;
        }, {
            message: "Rating must be a float value from 0.0 to 5.0 in steps of 0.5, with exactly one decimal place",
        }),

        "rating-gte": z.coerce.number()
        .optional()
        .refine((value) => {
            if (value !== undefined) {
                return /^(0(\.0|\.5)?|[1-4](\.0|\.5)?|5(\.0)?)$/.test(value.toFixed(1));
            }
            return true;
        }, {
            message: "rating-gt must be a float value from 0.0 to 5.0 in steps of 0.5, with exactly one decimal place",
        })
    })
    .refine((data) => {
        const { rating, "rating-gte": ratingGt } = data;
        const count = [rating, ratingGt].filter(val => val !== undefined).length;

        // Não permitir mais de um parâmetro
        // de filtragem definido ao mesmo tempo:
        return count <= 1;
    }, {
        message: "You can only specify one of the parameters: rating or rating-gt.",
    })
    .refine(data => {
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

    const { page, perPage, ...queryProps } = getAllQuerySchema.parse(request.query);

    const getAllFeedbacksInput = { ...queryProps } as GetAllFeedbacksUseCaseRequest;

    if (page !== undefined && perPage !== undefined) {
        getAllFeedbacksInput.skipQuantity = (page - 1) * perPage;
        getAllFeedbacksInput.itemsPerPage = perPage;
    }

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const getAllFeedbacksUseCase = new GetAllFeedbacksUseCase(prismaFeedbacksRepository);

    try {
        const getAllFeedbacksResponse = await getAllFeedbacksUseCase.execute(getAllFeedbacksInput);

        if (getAllFeedbacksResponse.meta) {
            return reply.status(200).send({
                feedbacks: getAllFeedbacksResponse.feedbacks,
                meta: {
                    currentPage: page,
                    perPage: perPage,
                    ...getAllFeedbacksResponse.meta
                }
            });
        }
        
        return reply.status(200).send(getAllFeedbacksResponse.feedbacks);
    } catch (error) {
        throw error;
    }
}
