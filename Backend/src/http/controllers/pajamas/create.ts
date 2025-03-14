import { PajamaGender, PajamaSeason, PajamaType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { CreatePajamaUseCase, CreatePajamaUseCaseRequest } from "src/use-cases/pajamas/create-pajama-use-case";
import { z } from "zod";

export async function createPajama(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string()
            .nonempty("Name cannot be empty")
            .min(6, "Name is too small, it must be at least 6 characters long")
            .max(100, "Name is too big, it must be no longer than 100 characters")
            .refine(name => /^[A-Za-z\s]+$/.test(name), {
                message: "Name must contain only alphabetic characters and spaces",
            }),

        description: z.string(),

        image: z.string().nonempty().url(),

        season: z.enum(Object.values(PajamaSeason) as [string, ...string[]]),

        type: z.enum(Object.values(PajamaType) as [string, ...string[]]),

        gender: z.enum(Object.values(PajamaGender) as [string, ...string[]]),

        favorite: z.coerce.boolean(),

        onSale: z.coerce.boolean(),

        price: z.number()
            .positive({ message: "The price must be a positive number" })
            .refine((price) => /^\d+(\.\d{1,2})?$/.test(price.toString()), {
                message: "The input must be a valid price (e.g.: \'100\', \'123.45\', \'110.1\')",
            }),

        salePercent: z.coerce.number()
            .min(0, "Sale percent must be at least 0")
            .max(100, "Sale percent must be no greater than 100")
            .optional(),
    });

    const registerBody = registerBodySchema.parse(request.body);

    try {
        const prismaPajamaRepository = new PrismaPajamasRepository();
        const createPajamaCase = new CreatePajamaUseCase(prismaPajamaRepository);

        const createPajamaResponse = await createPajamaCase.execute(registerBody as CreatePajamaUseCaseRequest);

        return reply.status(201).send(createPajamaResponse.pajama);

    } catch (error) {
        throw error;
    }
}
