import { Sale } from "@prisma/client";
import { SaleCreateInput, SalesRepository } from "../sales-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaSalesRepository implements SalesRepository {
    async create(saleData: SaleCreateInput): Promise<Sale> {
        // Verificando se o endereço fornecido já existe:
        const existingAddress = await prismaClient.address.findFirst({
            where: {
                zipCode: saleData.zipCode,
                state: saleData.state,
                city: saleData.city,
                neighborhood: saleData.neighborhood,
                address: saleData.address,
                number: saleData.number
            }
        });

        let sale: Sale;
        
        if (existingAddress === null) {
            sale = await prismaClient.sale.create({
                data: {
                    buyerName: saleData.buyerName,
                    cpf: saleData.cpf,
                    price: saleData.price,
                    paymentMethod: saleData.paymentMethod,
                    installments: saleData.installments,
                    cardNumber: saleData.cardNumber,
                    
                    address: {
                        create: {
                            zipCode: saleData.zipCode,
                            state: saleData.state,
                            city: saleData.city,
                            neighborhood: saleData.neighborhood,
                            address: saleData.address,
                            number: saleData.number
                        }
                    }
                }
            });

        } else {
            // Endereço fornecido já existe:
            sale = await prismaClient.sale.create({
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
        }


        // Criando o relacionamento N:N entre Sale e Pajama (SalePajama):

        // Fazendo as requisições assíncronas independentemente (sem await) para
        // maximizar a eficiência da criação de venda:
        await prismaClient.$transaction(
            saleData.PajamasBought.map(pajama => {
                return prismaClient.salePajama.create({
                    data: {
                        saleId: sale.id,
                        pajamaId: pajama.pajamaId,
                        quantity: pajama.quantity,
                        price: pajama.quantity * pajama.pajamaPrice
                    }
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

    async delete(saleId: string): Promise<Sale> {
        const sale = await prismaClient.sale.findUnique({
            where: {
                id: saleId
            }
        });

        // Contagem de Vendas com o Endereço Referenciado:
        const addressCount = await prismaClient.sale.count({
            where: {
                // A existência de sale é assegurada no use case, então
                // podemos usar o operador de asserção não-nulo
                addressId: sale!.addressId
            }
        });

        const deletedSale = await prismaClient.sale.delete({
            where: {
                id: saleId
            }
        });

        // Requisito: Remover endereço que estava sendo
        // referenciado unicamente pela venda recém removida:
        if (addressCount <= 1) {
            await prismaClient.address.delete({
                where: {
                    // A existência de sale é assegurada no use case, então
                    // podemos usar o operador de asserção não-nulo
                    id: sale!.addressId
                }
            });
        }

        return deletedSale;
    }

    getSaleInfo(saleId: string): Promise<SaleInfoResponse | null>;

    update(saleId: string, updateData: SaleUpdateInput): Promise<Sale | null>;
}
