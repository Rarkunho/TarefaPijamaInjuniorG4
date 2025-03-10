import { PaymentMethod, Prisma, Sale } from "@prisma/client";

export interface SaleInfoResponse
    extends Prisma.SaleUncheckedCreateInput,
            Prisma.AddressUncheckedCreateInput {
    quantity: number;
}

export interface PajamaBoughtInfo {
    pajamaId: string;
    quantity: number;
    pajamaPrice: number;
}

export interface SaleCreateInput
    extends Prisma.SaleUncheckedCreateInput,
            Prisma.AddressUncheckedCreateInput {
    PajamasBought: PajamaBoughtInfo[];
}

export interface SaleUpdateInput {
    buyerName?: string;
    cpf?: string;
    price?: number;
    paymentMethod?: PaymentMethod;
    installments?: number;
    cardNumber?: string;
}

export interface SalesRepository {
    create(saleData: SaleCreateInput): Promise<Sale>;
    delete(saleId: string): Promise<Sale | null>;
    findById(saleId: string): Promise<Sale | null>;
    getSaleInfo(saleId: string): Promise<SaleInfoResponse | null>;
    update(saleId: string, updateData: SaleUpdateInput): Promise<Sale | null>;
}
