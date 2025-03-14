

interface Pijama {
    name: string
    description: string
    image: string
    price: number
    season: string
    type: string | number
    gender: string | number
    favorite: boolean
    onSale: boolean
    salePercent?: number
    id: string
}


export default Pijama
