import { PajamasRepository } from "src/repositories/pajamas-repository";
import { Pajama } from "@prisma/client";

interface GetAllPajamasUseCaseRequest {
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
        if (!GetAllPajamasInput.itemsPerPage && !GetAllPajamasInput.itemsPerPage) {
            const allPajamas = await this.pajamasRepository.getAllPajamas();

            return { pajamas: allPajamas } as GetAllPajamasUseCaseResponse;

        } else {
            const [allPajamas, totalItems] = await Promise.all([
                this.pajamasRepository.getPajamasPaginated(
                    GetAllPajamasInput.skipQuantity!,
                    GetAllPajamasInput.itemsPerPage
                ),
                this.pajamasRepository.getPajamasCount()
            ]);

            const totalPages = Math.ceil(totalItems / GetAllPajamasInput.itemsPerPage);

            return {
                pajamas: allPajamas,
                meta: {
                    totalItems: totalItems,
                    totalPages: totalPages
                }
            }
        }

    }
} 
