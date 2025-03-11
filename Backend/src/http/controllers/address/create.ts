import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { CreateAddressUseCase } from "src/use-cases/address/create";
import { z } from "zod";

export async function create(request : FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        zipCode : z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        address: z.string(),
        number : z.string()
    })

    
    const { zipCode, state, city, neighborhood, address, number } = registerBodySchema.parse(request.body)

    try {
        const prismaAddressRepository = new PrismaAddressRepository()
        const createAddressUseCase = new CreateAddressUseCase(prismaAddressRepository)
        await createAddressUseCase.execute({
            zipCode,
            state,
            city,
            neighborhood,
            address,
            number
        })
        
    } catch (error) {
        throw error
    }
    return  reply.status(201).send('Novo endereço registrado')

}