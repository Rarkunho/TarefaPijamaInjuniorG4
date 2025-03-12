import { Pajama, Prisma } from "@prisma/client";

export interface PajamaUpdateInput
    extends Partial<Prisma.PajamaUncheckedCreateInput> {}

export interface PajamaInfoResponse
    extends Omit<Prisma.PajamaUncheckedCreateInput, 'id'>,
            Required<Pick<Prisma.PajamaUncheckedCreateInput, 'id'>> {
    // Omite informação redundante do pajamaId:
    pajamaSizesInfo: Omit<Prisma.PajamaSizeUncheckedCreateInput, 'pajamaId'>[];
}

export interface PajamasRepository {
    create(pajamaData: Prisma.PajamaCreateInput): Promise<Pajama>;
    delete(pajamaId: string): Promise<Pajama>;
    getPajamaInfo(pajamaId: string): Promise<PajamaInfoResponse>;
    update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajama | null>;
}
