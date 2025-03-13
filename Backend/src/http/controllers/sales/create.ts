import { PajamaSizes, PaymentMethod } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaPajamasSizeRepository } from "src/repositories/prisma/prisma-pajama-size-repository";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { PrismaSalePajamasRepository } from "src/repositories/prisma/prisma-sale-pajamas-repository";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { InsufficientPajamaSizeStockQuantityError } from "src/use-cases/errors/insufficient-pajama-size-stock-quantity-error";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
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
            
        }).refine(data => {
            if (data.paymentMethod === PaymentMethod.CREDIT_CARD) {
                return data.cardNumber !== undefined;
            }

            if (data.cardNumber !== undefined) {
                return data.paymentMethod === PaymentMethod.CREDIT_CARD
            }

            if (data.paymentMethod === PaymentMethod.PIX) {
                data.installments = 1;
            }

            return true;
        }, {
            message: `Credit Card Payment Method must Contain a Valid Credit Card Number and \'paymentMethod\' field must be \'${PaymentMethod.CREDIT_CARD}\'`
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

                size: z.enum(Object.values(PajamaSizes) as [string, ...string[]]),

                quantity: z.coerce.number()
                .int({ message: "Quantity must be a integer number" })
                .positive({ message: "Quantity must be a positive integer number" })
            })
        ).min(1, { message: "It is necessary to buy at least one pajama" })
    });
    
    const createBody = createBodySchema.parse(request.body);

    const prismaSalesRepository = new PrismaSalesRepository();
    const prismaAddressRepository = new PrismaAddressRepository();
    const prismaPajamasRepository = new PrismaPajamasRepository();
    const prismaSalePajamasRepository = new PrismaSalePajamasRepository();
    const prismaPajamasSizeRepository = new PrismaPajamasSizeRepository();
    
    const createSaleUseCase = new CreateSaleUseCase(
        prismaSalesRepository,
        prismaAddressRepository,
        prismaPajamasRepository,
        prismaSalePajamasRepository,
        prismaPajamasSizeRepository
    );

    try {
        const createdSaleResponse = await createSaleUseCase.execute(createBody as CreateSaleUseCaseRequest);
        
        return reply.status(201).send({
            saleId: createdSaleResponse.sale.id,
            buyerName: createdSaleResponse.sale.buyerName,
            price: createdSaleResponse.sale.price,
            paymentMethod: createdSaleResponse.sale.paymentMethod,
            installments: createdSaleResponse.sale.installments
        });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof InsufficientPajamaSizeStockQuantityError) {
            return reply.status(422).send({ message: error.message });
        }
        
        throw error;
    }
}
