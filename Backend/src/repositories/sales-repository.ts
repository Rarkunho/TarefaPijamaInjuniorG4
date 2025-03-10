import { PaymentMethod, Prisma, Sale } from "@prisma/client";

interface SaleInfoResponse
extends Prisma.SaleUncheckedCreateInput,
        Prisma.AddressUncheckedCreateInput {
    quantity: number;
    price: number;
}

interface SaleUpdateInput {
    buyerName?: string;
    cpf?: string;
    price?: number;
    paymentMethod?: PaymentMethod;
    installments?: number;
    cardNumber?: string;
}

export interface SalesRepository {
    create(saleData: Prisma.SaleUncheckedCreateInput): Promise<Sale>;
    update(saleId: string, updateData: SaleUpdateInput): Promise<Sale | null>;
    delete(saleId: string): Promise<Sale | null>;
    findById(saleId: string): Promise<Sale | null>;
    getSaleInfo(saleId: string): Promise<SaleInfoResponse | null>;
}
