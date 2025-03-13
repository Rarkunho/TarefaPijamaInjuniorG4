import { PajamaSizes, Prisma, Sale } from "@prisma/client";

export interface SaleInfoResponse
    extends Omit<Prisma.SaleUncheckedCreateInput, 'id'>,
            Omit<Prisma.AddressUncheckedCreateInput, 'id'> {
    saleId: string;
    quantity: number;
}

export interface PajamaBoughtInfo {
    pajamaId: string;
    size: PajamaSizes;
    quantity: number;
}

export interface SaleCreateInput {
    pajamaSaleData: Omit<Prisma.SaleUncheckedCreateInput, 'addressId'>;
    pajamaSaleAddressData: Prisma.AddressUncheckedCreateInput;
    pajamasBought: PajamaBoughtInfo[];
}

export interface SaleUpdateInput
    extends Partial<Prisma.SaleUncheckedCreateInput> {}

export interface SalesRepository {
    // CREATE refatorado
    create(saleData: Prisma.SaleUncheckedCreateInput): Promise<Sale>;

    findById(saleId: string): Promise<Sale | null>;
    
    // DELETE refatorado
    delete(saleId: string): Promise<Sale>;
    countAddressQuantity(addressId: string): Promise<number>;
    
    // TODO: refatorar em use cases

    update(saleId: string, updateData: SaleUpdateInput): Promise<Sale>;
}
