import { Address, Prisma } from "@prisma/client";

export interface AddressRepository {
    findById(addressId: string): Promise<Address | null>;
    findOrCreate(addressId: string, addressData: Prisma.AddressUncheckedCreateInput): Promise<Address>;
    delete(addressId: string): Promise<Address>;
}
