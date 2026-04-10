export interface apiResponse {
    statusCode: number,
    data: any,
    statusMessage: string
}

export interface items {
    id?: string,
    itemName?: string,
    categoryId?: string,
    categoryName?: string,
    price?: number,
    Discount?: number,
    Quantity?: number,
    TotalStock?: number,
    IsOnSale?: boolean,
}