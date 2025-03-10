import { Pajamas, Prisma } from "@prisma/client";

interface PajamaUpdateInput {
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    season?: string;
    type?: string;
    gender?: string;
    favorite?: boolean;
    onSale?: boolean;
    salePercent?: number;
}

interface PajamasRepository {
    create(pajamaData: Prisma.PajamasCreateInput): Promise<Pajamas>;
    // update(pajamaId: string, updateData: PajamaUpdateInput): Promise<Pajamas>;

    // TODO: Solicitar monitoria para sanar dúvidas referentes ao update

}
