import { Pajama, Prisma } from "@prisma/client";
import { GetAllPajamasUseCaseRequest } from "src/use-cases/pajamas/get-all-pajamas-use-case";

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
    findById(pajamaId: string): Promise<Pajama | null>;
    findManyById(pajamaIdArray: string[]): Promise<Pajama[]>;
    delete(pajamaId: string): Promise<Pajama>;
    getPajamaInfo(pajamaId: string): Promise<PajamaInfoResponse>;
    update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajama>;
    getAllPajamas(searchFilters: Omit<GetAllPajamasUseCaseRequest, 'skipQuantity' | 'itemsPerPage'>): Promise<Pajama[]>;
    getPajamasCount(searchFilters: Omit<GetAllPajamasUseCaseRequest, 'skipQuantity' | 'itemsPerPage'>): Promise<number>;
    getPajamasPaginated(skipQuantity: number, itemsPerPage: number, searchFilters: Omit<GetAllPajamasUseCaseRequest, 'skipQuantity' | 'itemsPerPage'>): Promise<Pajama[]>;
}
