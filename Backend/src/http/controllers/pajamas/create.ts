import { PajamaGender, PajamaSeason, PajamaType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { CreatePajamaUseCase, CreatePajamaUseCaseRequest } from "src/use-cases/pajamas/create-pajama-use-case";
import { z } from "zod";

export async function createPajama(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string()
            .nonempty("Name cannot be empty")
            .min(6, "Name is too small, it must be at least 6 characters long")
            .max(100, "Name is too big, it must be no longer than 100 characters")
            .refine(name => /^[A-Za-z\s]+$/.test(name), {
                message: "Name must contain only alphabetic characters and spaces",
            }),

        description: z.string()
            .nonempty("Description cannot be empty"),

        image: z.string()
            .nonempty("Image URL cannot be empty")
            .url("Image must be a valid URL"),

        season: z.enum(Object.values(PajamaSeason) as [string, ...string[]])
            .refine((season) => Object.values(PajamaSeason).includes(season as PajamaSeason), {
                message: "Invalid pajama season",
            }),

        type: z.enum(Object.values(PajamaType) as [string, ...string[]])
            .refine((type) => Object.values(PajamaType).includes(type as PajamaType), {
                message: "Invalid pajama type",
            }),

        gender: z.enum(Object.values(PajamaGender) as [string, ...string[]])
            .refine((gender) => Object.values(PajamaGender).includes(gender as PajamaGender), {
                message: "Invalid pajama gender",
            }),

        favorite: z.coerce.boolean({
            invalid_type_error: "Favorite must be a boolean value (true or false)",
        }),

        onSale: z.coerce.boolean({
            invalid_type_error: "OnSale must be a boolean value (true or false)",
        }),

        price: z.number()
            .positive({ message: "The price must be a positive number" })
            .refine((price) => /^\d+(\.\d{1,2})?$/.test(price.toString()), {
                message: "The input must be a valid price (e.g.: \'100\', \'123.45\', \'110.1\')",
            }),

        salePercent: z.coerce.number()
            .min(0, "Sale percent must be at least 0")
            .max(100, "Sale percent must be no greater than 100")
            .optional()
    });

    const registerBody = createBodySchema.parse(request.body);
    
    const prismaPajamaRepository = new PrismaPajamasRepository();
    const createPajamaCase = new CreatePajamaUseCase(prismaPajamaRepository);

    try {
        const createPajamaResponse = await createPajamaCase.execute(registerBody as CreatePajamaUseCaseRequest);

        return reply.status(201).send(createPajamaResponse.pajama);

    } catch (error) {
        throw error;
    }
}
