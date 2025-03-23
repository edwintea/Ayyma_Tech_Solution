import { eventBus } from '../events/eventBus';
import { OrderPlacedEvent, OrderReadyForShippingEvent } from './orderTypes';

class OrderService {
    constructor() {
        eventBus.subscribe('StockReserved', this.handleStockReserved.bind(this));
        eventBus.subscribe('OutOfStock', this.handleOutOfStock.bind(this));
    }

    public placeOrder(orderId: string, items: Array<{ productId: string; quantity: number }>) {
        const event: OrderPlacedEvent = {
            type: 'OrderPlaced',
            data: { orderId, items },
        };
        eventBus.publish('OrderPlaced', event);
    }

    private handleStockReserved(event: any) {
        // Logic to handle stock reserved
        // For simplicity, we assume all items are ready for shipping
        const orderId = 'order1'; //sample orderid
        const items = event.data; 
        const readyEvent: OrderReadyForShippingEvent = {
            type: 'OrderReadyForShipping',
            data: { orderId, items },
        };
        eventBus.publish('OrderReadyForShipping', readyEvent);
    }

    private handleOutOfStock(event: any) {
        // Logic to handle out of stock items
        console.log(`Out of stock for product ${event.data.productId}. Requested: ${event.data.requested}, Available: ${event.data.available}`);
        // Here you could implement backorder logic or notify the user
    }
}

export const orderService = new OrderService();