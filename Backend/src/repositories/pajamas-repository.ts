import { Pajama, Prisma } from "@prisma/client";

export interface PajamaUpdateInput
    extends Partial<Prisma.PajamaUncheckedCreateInput> {}

export interface PajamaInfoResponse
    extends Omit<Prisma.PajamaUncheckedCreateInput, 'id'>,
            Required<Pick<Prisma.PajamaUncheckedCreateInput, 'id'>> {
    // Omite informação redundante do pajamaId:
    pajamaSizesInfo: Omit<Prisma.PajamaSizeUncheckedCreateInput, 'pajamaId'>[];
}

export interface SearchPajamaFilters
    extends Partial<Omit<Prisma.PajamaUncheckedCreateInput, 'salePajamas' | 'sizes'>> {}

export interface PajamasPaginationParams {
    skip?: number;
    take?: number;
}

export interface PajamasRepository {
    create(pajamaData: Prisma.PajamaCreateInput): Promise<Pajama>;
    findById(pajamaId: string): Promise<Pajama | null>;
    findManyById(pajamaIdArray: string[]): Promise<Pajama[]>;
    delete(pajamaId: string): Promise<Pajama>;
    update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajama>;
    getAllPajamas(searchFilters: SearchPajamaFilters, paginationParams: PajamasPaginationParams): Promise<Pajama[]>;
    getPajamasCount(searchFilters: SearchPajamaFilters): Promise<number>;
}
