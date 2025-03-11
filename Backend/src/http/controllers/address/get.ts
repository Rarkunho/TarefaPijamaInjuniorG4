import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { GetAdressUseCase } from "src/use-cases/address/get-id";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { GetUserUseCase } from "src/use-cases/user/get-id";
import { z } from "zod";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id} = getParamsSchema.parse(request.params)

    try {
        const prismaAddressRepository = new PrismaAddressRepository
        const getAddressUseCase = new GetAdressUseCase(prismaAddressRepository)
        const address = await getAddressUseCase.execute({
            id 
        })
        return reply.status(200).send(address)
    } catch (error) {
        if (error instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}