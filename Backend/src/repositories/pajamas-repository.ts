import { Pajama, Prisma } from "@prisma/client";

interface PajamaUpdateInput
    extends Partial<Omit<Prisma.PajamaUncheckedCreateInput, 'id'>> {}

interface PajamaInfoResponse
    extends Omit<Prisma.PajamaUncheckedCreateInput, 'id'>,
            Required<Pick<Prisma.PajamaUncheckedCreateInput, 'id'>> {
    // Omite informação redundante do pajamaId:
    pajamaSizesInfo: Omit<Prisma.PajamaSizeUncheckedCreateInput, 'pajamaId'>[];
}

export interface PajamasRepository {
    create(pajamaData: Prisma.PajamaCreateInput): Promise<Pajama>;
    update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajama>;
    getPajamaInfo(pajamaId: string): Promise<PajamaInfoResponse>;
    delete(pajamaId: string): Promise<Pajama>;
}
