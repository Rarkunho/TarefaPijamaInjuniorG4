import { PajamaSizes, PaymentMethod } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAddressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaPajamasSizeRepository } from "src/repositories/prisma/prisma-pajama-size-repository";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { PrismaSalePajamasRepository } from "src/repositories/prisma/prisma-sale-pajamas-repository";
import { PrismaSalesRepository } from "src/repositories/prisma/prisma-sales-repository";
import { PurchaseNotAllowedError } from "src/use-cases/errors/purchase-not-allowed-error";
import { StockPajamasValidationError } from "src/use-cases/errors/stock-pajamas-validation-error";
import { CreateSaleUseCase, CreateSaleUseCaseRequest } from "src/use-cases/sales/create-sale-use-case";
import { z } from "zod";

export async function createSale(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        pajamaSaleData: z.object({
            buyerName: z.string()
                .nonempty("Buyer name cannot be empty")
                .min(6, { message: "Buyer name must have at least 6 characters" }),

            cpf: z.coerce.string()
                .nonempty("CPF cannot be empty")
                .length(11, { message: "CPF must have exactly 11 characters" })
                .refine((cpf) => /^\d+$/.test(cpf), {
                    message: "The input must be a string containing only digits"
                }),

            paymentMethod: z.enum(Object.values(PaymentMethod) as [string, ...string[]])
                .refine((method) => Object.values(PaymentMethod).includes(method as PaymentMethod), {
                    message: "Invalid payment method"
                }),

            installments: z.coerce.number()
                .int({ message: "The input must be an integer value" })
                .positive({ message: "The input must be a positive value" })
                .min(1, { message: "The minimum number of installments is 1" })
                .max(6, { message: "The maximum number of installments is 6" })
                .optional()
                .default(1),

            cardNumber: z.coerce.string()
                .min(13, { message: "Card number must have at least 13 digits" })
                .max(19, { message: "Card number can have a maximum of 19 digits" })
                .refine((cardNumber) => /^\d+$/.test(cardNumber), {
                    message: "The input must be a string containing only digits"
                })
                .optional()

        }).refine(data => {
            if (data.paymentMethod === PaymentMethod.CREDIT_CARD) {
                return data.cardNumber !== undefined;
            }

            if (data.cardNumber !== undefined) {
                return data.paymentMethod === PaymentMethod.CREDIT_CARD;
            }

            if (data.paymentMethod === PaymentMethod.PIX) {
                data.installments = 1;
            }

            return true;
        }, {
            message: `Credit Card Payment Method must Contain a Valid Credit Card Number and 'paymentMethod' field must be '${PaymentMethod.CREDIT_CARD}'`
        }),

        pajamaSaleAddressData: z.object({
            zipCode: z.coerce.string()
                .length(8, { message: "ZIP code must contain exactly 8 digits" })
                .refine((zipcode) => /^\d+$/.test(zipcode), {
                    message: "The input must be a string containing only digits"
                }),

            state: z.string()
                .nonempty("State cannot be empty"),

            city: z.string()
                .nonempty("City cannot be empty"),

            neighborhood: z.string()
                .nonempty("Neighborhood cannot be empty"),

            address: z.string()
                .nonempty("Address cannot be empty"),

            number: z.coerce.string()
                .nonempty("Number cannot be empty")
                .refine((number) => /^\d+$/.test(number), {
                    message: "The input must be a string containing only digits"
                })
        }),

        pajamasBought: z.array(
            z.object({
                pajamaId: z.string()
                    .nonempty("Pajama ID cannot be empty")
                    .uuid("Pajama ID must be a valid UUID"),

                size: z.enum(Object.values(PajamaSizes) as [string, ...string[]])
                    .refine((size) => Object.values(PajamaSizes).includes(size as PajamaSizes), {
                        message: "Invalid pajama size"
                    }),

                quantity: z.coerce.number()
                    .int({ message: "Quantity must be an integer" })
                    .positive({ message: "Quantity must be a positive integer" })
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
        if (error instanceof StockPajamasValidationError) {
            return reply.status(422).send({
                messages: error.stockValidationErrors.map(error => error.message)
            });
        }

        if (error instanceof PurchaseNotAllowedError) {
            return reply.status(400).send({ message: error.message });
        }

        throw error;
    }
}
