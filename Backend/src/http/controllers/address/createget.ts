import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { CreateGetAddressUseCase } from "src/use-cases/address/create-get";
import { z } from "zod";

export async function createOrGet(request : FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        zipCode : z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        address: z.string(),
        number : z.string()
    })

    const getParamsSchema = z.object({
        id : z.string().uuid()
    })

    const { zipCode, state, city, neighborhood, address, number } = registerBodySchema.parse(request.body)
    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaAddressRepository = new PrismaAddressRepository()
        const createGetAddressUseCase = new CreateGetAddressUseCase(prismaAddressRepository)
        const newAddress = await createGetAddressUseCase.execute({
            id,
            create : { 
                zipCode,
                state,
                city,
                neighborhood,
                address,
                number
            }
        })
        return  reply.status(201).send(newAddress)
    } catch (error) {
        throw error
    }


}