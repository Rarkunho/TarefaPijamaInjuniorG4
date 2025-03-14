import { PajamasRepository } from "src/repositories/pajamas-repository";
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
        
        if (skipQuantity !== undefined && itemsPerPage !== undefined) {
            const [allPajamas, totalItems] = await Promise.all([
                this.pajamasRepository.getPajamasPaginated(
                    skipQuantity,
                    itemsPerPage,
                    searchFilters
                ),
                this.pajamasRepository.getPajamasCount(searchFilters)
            ]);
    
            const totalPages = Math.ceil(totalItems / itemsPerPage);
    
            return {
                pajamas: allPajamas,
                meta: {
                    totalItems: totalItems,
                    totalPages: totalPages
                }
            }
            
        } else {
            const allPajamas = await this.pajamasRepository.getAllPajamas(searchFilters);
    
            return { pajamas: allPajamas } as GetAllPajamasUseCaseResponse;
        }
    }
} 
