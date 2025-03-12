import { PaymentMethod } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { CreateSaleUseCase, CreateSaleUseCaseRequest } from "src/use-cases/sales/create-sale-use-case";
import { z } from "zod";

export async function createSale(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        pajamaSaleData: z.object({
            buyerName: z.string().nonempty().min(6),
            
            cpf: z.coerce.string()
            .nonempty()
            .length(11)
            .refine((cpf) => /^\d+$/.test(cpf), {
                message: "The input must be a string containing only digits"
            }),
            
            price: z.coerce.number()
            .positive({ message: "The price must be a positive number" })
            .refine((price) => /^\d+(\.\d{2})?$/.test(price.toString()), {
                message: "The input must be a valid price (e.g.: \'100\', \'123.45\', \'110.1\')",
            }),

            paymentMethod: z.enum(Object.values(PaymentMethod) as [string, ...string[]]),
            
            installments: z.coerce.number()
            .int({ message: "The input must be an integer value" })
            .positive({ message: "The input must be a positive value" })
            .min(1, { message: "The minimum number of installments is 1" })
            .max(6, { message: "The maximum number of installments is 6" })
            .optional().default(1),

            cardNumber: z.coerce.string()
            .min(13)
            .max(19)
            .refine((cardNumber) => /^\d+$/.test(cardNumber), {
                message: "The input must be a string containing only digits"
            })
            .optional()
            
        }),
        
        pajamaSaleAddressData: z.object({
            zipCode: z.coerce.string()
            .length(8, { message: "ZIP code must contain exactly 8 digits" })
            .refine((zipcode) => /^\d+$/.test(zipcode), {
                message: "The input must be a string containing only digits"
            }),

            state: z.string().nonempty(),

            city: z.string().nonempty(),

            neighborhood: z.string().nonempty(),

            address: z.string().nonempty(),

            number: z.coerce.string().nonempty().refine((number) => /^\d+$/.test(number), {
                message: "The input must be a string containing only digits"
            })
        }),

        pajamasBought: z.array(
            z.object({
                pajamaId: z.string().nonempty().uuid(),

                quantity: z.coerce.number()
                .int({ message: "Quantity must be a integer number" })
                .positive({ message: "Quantity must be a positive integer number" })
            })
        ).min(1, { message: "It is necessary to buy at least one pajama" })
    });
    
    const createSaleParams = createBodySchema.parse(request.body);

    const prismaSalesRepository = new PrismaSalesRepository();
    const createSaleUseCase = new CreateSaleUseCase(prismaSalesRepository);

    try {
        const createdSale = await createSaleUseCase.execute({
            createData: {
                ...createSaleParams,
                pajamaSaleData: {
                    ...createSaleParams.pajamaSaleData,
                    paymentMethod: createSaleParams.pajamaSaleData.paymentMethod as PaymentMethod
                }
            }
        } as CreateSaleUseCaseRequest);
        
        return await reply.status(201).send({
            status: "success",
            data: {
                saleId: createdSale.sale.id,
                buyerName: createdSale.sale.buyerName,
                price: createdSale.sale.price,
                paymentMethod: createdSale.sale.paymentMethod,
                installments: createdSale.sale.installments
            }
        });

    } catch (error) {
        return await reply.status(400).send({
            status: "error",
            message: "Error while Creating Sale Instance in Database"
        });
    }
}
