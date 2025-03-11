import { Address, Prisma } from "@prisma/client";

export interface AddressRepository {
    findById(addressId: string): Promise<Address | null>;
    Create(addressData: Prisma.AddressUncheckedCreateInput): Promise<Address>;
    delete(addressId: string): Promise<Address>;
}
