import { PaymentMethod, Prisma, Sale } from "@prisma/client";

export interface SaleInfoResponse
    extends Omit<Prisma.SaleUncheckedCreateInput, 'id'>,
            Omit<Prisma.AddressUncheckedCreateInput, 'id'> {
    saleId: string;
    quantity: number;
}

export interface PajamaBoughtInfo {
    pajamaId: string;
    quantity: number;
}

export interface SaleCreateInput
    extends Prisma.SaleUncheckedCreateInput,
            Prisma.AddressUncheckedCreateInput {
    PajamasBought: PajamaBoughtInfo[];
}

export interface SaleUpdateInput
    extends Partial<Prisma.SaleUncheckedCreateInput> {}

export interface SalesRepository {
    create(saleData: SaleCreateInput): Promise<Sale>;
    delete(saleId: string): Promise<Sale | null>;
    findById(saleId: string): Promise<Sale | null>;
    getSaleInfo(saleId: string): Promise<SaleInfoResponse | null>;
    update(saleId: string, updateData: SaleUpdateInput): Promise<Sale | null>;
}
