import { Address, Prisma } from "@prisma/client";
import { AddressRepository } from "../address-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaAddressRepository implements AddressRepository {
    async findById(addressId: string): Promise<Address | null> {
        const address = await prismaClient.address.findUnique({
            where: {
                id: addressId
            }
        });

        return address;
    }
    
    async findOrCreate(addressId: string, addressData: Prisma.AddressUncheckedCreateInput): Promise<Address> {
        const address = await prismaClient.address.upsert({
            where: { id: addressId },
            update: {},
            create: addressData
        });

        return address;
    }

    async delete(addressId: string): Promise<Address> {
        const deletedAddress = await prismaClient.address.delete({
            where: {
                id: addressId
            }
        });

        return deletedAddress;
    }
}
