import { PajamaGender, PajamaSeason, PajamaType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { UpdatePajamaUseCase, UpdatePajamaUseCaseRequest } from "src/use-cases/pajamas/update-pajama-use-case";
import { z } from "zod";

export async function UpdatePajama(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        pajamaId: z.string()
            .nonempty("Pajama ID cannot be empty")
            .uuid("Pajama ID must be a valid UUID")
    });


    const updateBodySchema = z.object({
        name: z.string()
            .nonempty("Name cannot be empty")
            .min(6, "Name is too small, it must be at least 6 characters long")
            .max(100, "Name is too big, it must be no longer than 100 characters")
            .refine(name => /^[A-Za-z\s]+$/.test(name), {
                message: "Name must contain only alphabetic characters and spaces",
            }).optional(),

        description: z.string()
            .nonempty("Description cannot be empty").optional(),

        image: z.string()
            .nonempty("Image URL cannot be empty")
            .url("Image must be a valid URL").optional(),

        season: z.enum(Object.values(PajamaSeason) as [string, ...string[]])
            .refine((season) => Object.values(PajamaSeason).includes(season as PajamaSeason), {
                message: "Invalid pajama season",
            }).optional(),

        type: z.enum(Object.values(PajamaType) as [string, ...string[]])
            .refine((type) => Object.values(PajamaType).includes(type as PajamaType), {
                message: "Invalid pajama type",
            }).optional(),

        gender: z.enum(Object.values(PajamaGender) as [string, ...string[]])
            .refine((gender) => Object.values(PajamaGender).includes(gender as PajamaGender), {
                message: "Invalid pajama gender",
            }).optional(),

        favorite: z.coerce.boolean({
            invalid_type_error: "Favorite must be a boolean value (true or false)",
        }).optional(),

        onSale: z.coerce.boolean({
            invalid_type_error: "OnSale must be a boolean value (true or false)",
        }).optional(),

        price: z.number()
            .positive({ message: "The price must be a positive number" })
            .refine((price) => /^\d+(\.\d{1,2})?$/.test(price.toString()), {
                message: "The input must be a valid price (e.g.: \'100\', \'123.45\', \'110.1\')",
            }).optional(),

        salePercent: z.coerce.number()
            .min(0, "Sale percent must be at least 0")
            .max(100, "Sale percent must be no greater than 100")
            .optional(),
    });

    const { pajamaId } = updateParamsSchema.parse(request.params);
    const updateBody = updateBodySchema.parse(request.body);

    const prismaPajamasRepository = new PrismaPajamasRepository();
    const updatePajamasUseCase = new UpdatePajamaUseCase(prismaPajamasRepository);

    try {
        const pajama = await updatePajamasUseCase.execute({
            pajamaId,
            data: updateBody
        } as UpdatePajamaUseCaseRequest);

        return reply.status(200).send(pajama);

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
