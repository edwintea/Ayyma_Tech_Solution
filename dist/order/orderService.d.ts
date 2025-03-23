declare class OrderService {
    constructor();
    placeOrder(orderId: string, items: Array<{
        productId: string;
        quantity: number;
    }>): void;
    private handleStockReserved;
    private handleOutOfStock;
}
export declare const orderService: OrderService;
export {};
