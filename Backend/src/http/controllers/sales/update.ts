import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found";
import { PaymentMethod } from "@prisma/client";
import { UpdateSaleUseCase } from "src/use-cases/sales/update-sale-use-case";
import { SaleUpdateFailedError } from "src/use-cases/errors/sale-update-failed-error";

export async function updateSale(request: FastifyRequest, reply: FastifyReply) {
    const updateSaleParamsSchema = z.object({
        saleId: z.string().uuid()
    });

    const updateSaleBodySchema = z.object({
        buyerName: z.string().nonempty().min(6).optional(),
                    
        cpf: z.coerce.string()
        .nonempty()
        .length(11)
        .refine((cpf) => /^\d+$/.test(cpf), {
            message: "The input must be a string containing only digits"
        }).optional(),
        
        price: z.coerce.number()
        .positive({ message: "The price must be a positive number" })
        .refine((price) => /^\d+(\.\d{2})?$/.test(price.toString()), {
            message: "The input must be a valid price (e.g.: \'100\', \'123.45\', \'110.1\')",
        }).optional(),

        paymentMethod: z.enum(Object.values(PaymentMethod) as [string, ...string[]]).optional(),
        
        installments: z.coerce.number()
        .int({ message: "The input must be an integer value" })
        .positive({ message: "The input must be a positive value" })
        .min(1, { message: "The minimum number of installments is 1" })
        .max(6, { message: "The maximum number of installments is 6" })
        .optional(),

        cardNumber: z.coerce.string()
        .min(13)
        .max(19)
        .refine((cardNumber) => /^\d+$/.test(cardNumber), {
            message: "The input must be a string containing only digits"
        })
        .optional()
    });
    
    const { saleId } = updateSaleParamsSchema.parse(request.params);

    const updateBody = updateSaleBodySchema.parse(request.params);

    const prismaSalesRepository = new PrismaSalesRepository();
    const updateSaleUseCase = new UpdateSaleUseCase(prismaSalesRepository);

    try {
        const updatedSale = await updateSaleUseCase.execute({
            id: saleId,
            updateData: {
                ...updateBody,
                paymentMethod: updateBody.paymentMethod as PaymentMethod
            }
        });
        
        return await reply.status(200).send({
            status: "success",
            data: updatedSale.sale
        });
        
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return await reply.status(404).send({
                status: "error",
                message: error.message
            });
        }

        if (error instanceof SaleUpdateFailedError) {
            return await reply.status(500).send({
                status: "error",
                message: error.message
            });
        }

        throw error;
    }
}
