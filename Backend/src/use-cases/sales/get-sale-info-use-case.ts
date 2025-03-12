import { SaleInfoResponse, SalesRepository } from "src/repositories/sales-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { SaleInfoRetrievalFailedError } from "../errors/sale-info-retrieval-failed-error";

interface GetSaleInfoSaleUseCaseRequest {
    id: string;
}

interface GetSaleInfoSaleUseCaseResponse {
    saleInfo: SaleInfoResponse;
}

export class GetSaleInfoUseCase {
    constructor(private readonly salesRepository: SalesRepository) {}

    async execute(getSaleInfoData: GetSaleInfoSaleUseCaseRequest): Promise<GetSaleInfoSaleUseCaseResponse> {
        const existingSale = await this.salesRepository.findById(getSaleInfoData.id);

        if (existingSale === null) {
            throw new ResourceNotFoundError();
        }

        const saleInfo = await this.salesRepository.getSaleInfo(getSaleInfoData.id);

        if (saleInfo === null) {
            throw new SaleInfoRetrievalFailedError();
        }

        return { saleInfo: saleInfo } as GetSaleInfoSaleUseCaseResponse;
    }
}
