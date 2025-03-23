export interface ShippingItem {
    productId: string;
    quantity: number;
    status: 'Pending Shipment' | 'Shipped' | 'Delivered'; // Add status property
}

export interface ItemShippedEvent {
    type: 'ItemShipped';
    data: {
        orderId: string;
        productId: string;
        quantity: number;
    };
}

export interface ItemDeliveredEvent {
    type: 'ItemDelivered';
    data: {
        orderId: string;
        productId: string;
    };
}

export interface ShippingItem {
    productId: string;
    quantity: number;
}