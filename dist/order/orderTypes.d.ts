export interface OrderPlacedEvent {
    type: 'OrderPlaced';
    data: {
        orderId: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
    };
}
export interface OrderReadyForShippingEvent {
    type: 'OrderReadyForShipping';
    data: {
        orderId: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
    };
}
export interface OrderItem {
    productId: string;
    quantity: number;
}
