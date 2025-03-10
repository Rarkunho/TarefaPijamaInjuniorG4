import { Sale } from "@prisma/client";
import { SaleCreateInput, SaleInfoResponse, SalesRepository, SaleUpdateInput } from "../sales-repository";
import { prismaClient } from "src/lib/prisma";
import { PrismaAddressRepository } from "./prisma-address-repository";
import { PrismaSalePajamasRepository } from "./prisma-sale-pajamas-repository";

export class PrismaSalesRepository implements SalesRepository {
    async countAddressQuantity(addressId: string): Promise<number> {
        return prismaClient.sale.count({
            where: {
                addressId: addressId
            }
        });
    }

    async create(saleData: SaleCreateInput): Promise<Sale> {
        // Verificando se o endereço fornecido já existe:
        const addressRepository = new PrismaAddressRepository();
        const existingAddress = await addressRepository.findOrCreate(
            saleData.addressId, {
            zipCode: saleData.zipCode,
            state: saleData.state,
            city: saleData.city,
            neighborhood: saleData.neighborhood,
            address: saleData.address,
            number: saleData.number
        });

        const sale = await prismaClient.sale.create({
            data: {
                buyerName: saleData.buyerName,
                cpf: saleData.cpf,
                price: saleData.price,
                paymentMethod: saleData.paymentMethod,
                installments: saleData.installments,
                cardNumber: saleData.cardNumber,
                
                addressId: existingAddress.id
            }
        });


        // Criando o relacionamento N:N entre Sale e Pajama (SalePajama):

        // Fazendo as requisições assíncronas independentemente (sem await) para
        // maximizar a eficiência da criação de venda:
        const salePajamasRepository = new PrismaSalePajamasRepository();
        await prismaClient.$transaction(
            saleData.PajamasBought.map(pajama => {
                return salePajamasRepository.asyncCreate({
                    saleId: sale.id,
                    pajamaId: pajama.pajamaId,
                    quantity: pajama.quantity,
                    price: pajama.quantity * pajama.pajamaPrice
                });
            })
        );

        return sale;
    }

    async findById(saleId: string): Promise<Sale | null> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        return sale;
    }

    async delete(saleId: string): Promise<Sale | null> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        if (sale === null) {
            throw new Error('Sale not Found in Delete Sale Method');
        }

        // Contagem de Vendas com o Endereço Referenciado:
        const addressCount = await this.countAddressQuantity(sale.addressId);

        const deletedSale = await prismaClient.sale.delete({
            where: {
                id: saleId
            }
        });

        // Requisito: Remover endereço que estava sendo
        // referenciado unicamente pela venda recém removida:
        if (addressCount <= 1) {
            const addressRepository = new PrismaAddressRepository();
            await addressRepository.delete(sale.addressId);
        }

        return deletedSale;
    }

    async getSaleInfo(saleId: string): Promise<SaleInfoResponse | null> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        if (sale === null) {
            throw new Error('Sale not Found in GetSaleInfo Sale Method');
        }

        const addressRepository = new PrismaAddressRepository();
        const address = await addressRepository.findById(sale.addressId);

        if (address === null) {
            throw new Error('Address not Found in GetSaleInfo Sale Method');
        }

        const salePajamasRepository = new PrismaSalePajamasRepository();
        const pajamasBought = await salePajamasRepository.findMany({
            saleId: sale.id
        });

        const amountPajamasPurchased = pajamasBought.reduce((qtyAccum, currentPajama) => {
            return qtyAccum + currentPajama.quantity
        }, 0);

        const saleInfoResponse: SaleInfoResponse = {
            // Propriedades do endereço:
            address: address.address,
            number: address.number,
            zipCode: address.zipCode,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,

            // Propriedades da venda:
            addressId: sale.addressId,
            buyerName: sale.buyerName,
            cpf: sale.cpf,
            paymentMethod: sale.paymentMethod,
            price: sale.price,
            installments: sale.installments,
            cardNumber: sale.cardNumber,

            // Quantidade comprada:
            quantity: amountPajamasPurchased,
        };

        return saleInfoResponse;
    }

    async update(saleId: string, updateData: SaleUpdateInput): Promise<Sale | null> {
        const updatedSale = await prismaClient.sale.update({
            where: { id: saleId },
            data: updateData
        });

        return updatedSale;
    }
}
