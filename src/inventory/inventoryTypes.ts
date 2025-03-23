export interface StockItem {
    productId: string;
    quantity: number;
}

export interface StockReservedEvent {
    type: 'StockReserved';
    data: {
        productId: string;
        quantity: number;
    };
}

export interface OutOfStockEvent {
    type: 'OutOfStock';
    data: {
        productId: string;
        requested: number;
        available: number;
    };
}