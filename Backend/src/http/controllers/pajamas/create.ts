import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { CreatePajamaUseCase } from "src/use-cases/pajamas/create";
import { z } from "zod";

export async function CreatePajama(request: FastifyRequest, reply : FastifyReply){
    const registerBodySchema = z.object({
        name : z.string(),
        description : z.string(),
        image : z.string(),
        season : z.string(),
        type : z.string(),
        gender : z.string(),
        favorite : z.boolean(),
        onSale : z.boolean(),
        price : z.number(),
        salePercent : z.number().optional()
    })

    const { name, description, image, season, type, gender, favorite, onSale, price, salePercent} = registerBodySchema.parse(request.body)

    try {
        const prismaPajamaRepository = new PrismaPajamasRepository()
        const createPajamaCase = new CreatePajamaUseCase(prismaPajamaRepository)
        await createPajamaCase.execute({  name, description, image, season, type, gender, favorite, onSale, price, salePercent })
    } catch (error) {
        throw error
    }

    return reply.status(201).send('Pijama adicionado com sucesso')

}