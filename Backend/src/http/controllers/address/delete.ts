import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository"
import { DeleteAddressUseCase } from "src/use-cases/address/delete"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found"
import { z } from 'zod'

export async function deleteAddress(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaAddressRepository = new PrismaAddressRepository()
        const deleteAddressUseCase = new DeleteAddressUseCase(prismaAddressRepository)
        const address = await deleteAddressUseCase.execute({
            id
        })
        return reply.status(204).send(address)
    } catch (err) {
        if (err instanceof (ResourceNotFoundError)) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}