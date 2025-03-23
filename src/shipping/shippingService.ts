import { eventBus } from '../events/eventBus';
import { ItemShippedEvent, ItemDeliveredEvent } from './shippingTypes';
import { ShippingItem } from './shippingTypes'; // Import the ShippingItem type

class ShippingService {
    constructor() {
        eventBus.subscribe('OrderReadyForShipping', this.handleOrderReadyForShipping.bind(this));
    }

    private handleOrderReadyForShipping(event: any) {
        const { orderId, items }: { orderId: string; items: ShippingItem[] } = event.data; // Specify the type for items
        items.forEach((item: ShippingItem) => { // Specify the type for item
            // Simulate shipping process
            console.log(`Shipping item ${item.productId} for order ${orderId}`);
            const shippedEvent: ItemShippedEvent = {
                type: 'ItemShipped',
                data: { orderId, productId: item.productId, quantity: item.quantity },
            };
            eventBus.publish('ItemShipped', shippedEvent);

            // Simulate delivery
            const deliveredEvent: ItemDeliveredEvent = {
                type: 'ItemDelivered',
                data: { orderId, productId: item.productId },
            };
            eventBus.publish('ItemDelivered', deliveredEvent);
        });
    }
}

export const shippingService = new ShippingService();