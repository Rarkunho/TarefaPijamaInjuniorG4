import { PajamasPaginationParams, PajamasRepository } from "src/repositories/pajamas-repository";
import { Pajama, PajamaGender, Prisma } from "@prisma/client";

export interface GetAllPajamasUseCaseRequest 
    extends Pick<Partial<Prisma.PajamaUncheckedCreateInput>, 'season' | 'gender' | 'favorite' | 'onSale' | 'type'> {
    skipQuantity?: number;
    itemsPerPage?: number;
}

interface GetAllPajamasUseCaseResponseMetaData {
    totalItems: number;
    totalPages: number;
}

interface GetAllPajamasUseCaseResponse {
    pajamas: Pajama[];
    meta?: GetAllPajamasUseCaseResponseMetaData;
}

export class GetAllPajamasUseCase {
    constructor(private readonly pajamasRepository: PajamasRepository) {}

    async execute(GetAllPajamasInput: GetAllPajamasUseCaseRequest): Promise<GetAllPajamasUseCaseResponse> {
        const { skipQuantity, itemsPerPage, ...searchFilters } = GetAllPajamasInput;

        const paginationFilters = {
            skip: skipQuantity,
            take: itemsPerPage
        } as PajamasPaginationParams;
        
        if (skipQuantity !== undefined && itemsPerPage !== undefined) {
            const [allPajamas, totalItems] = await Promise.all([
                this.pajamasRepository.getAllPajamas(
                    searchFilters,
                    paginationFilters
                ),
                
                this.pajamasRepository.getPajamasCount(searchFilters)
            ]);

            return {
                pajamas: allPajamas,
                meta: {
                    totalItems: totalItems,
                    totalPages: Math.ceil(totalItems / itemsPerPage)
                }
            }
            
        } else {
            const allPajamas = await this.pajamasRepository.getAllPajamas(searchFilters, {});
    
            return { pajamas: allPajamas } as GetAllPajamasUseCaseResponse;
        }
    }
} 
