import { PajamaSizes, PaymentMethod } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaPajamasSizeRepository } from "src/repositories/prisma/prisma-pajama-size-repository";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { PrismaSalePajamasRepository } from "src/repositories/prisma/prisma-sale-pajamas-repository";
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
            .refine((price) => /^\d+(\.\d{1,2})?$/.test(price.toString()), {
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
        throw error;
    }
}
