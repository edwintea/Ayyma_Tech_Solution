"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shippingService = void 0;
const eventBus_1 = require("../events/eventBus");
class ShippingService {
    constructor() {
        eventBus_1.eventBus.subscribe('OrderReadyForShipping', this.handleOrderReadyForShipping.bind(this));
    }
    handleOrderReadyForShipping(event) {
        const { orderId, items } = event.data; // Specify the type for items
        items.forEach((item) => {
            // Simulate shipping process
            console.log(`Shipping item ${item.productId} for order ${orderId}`);
            const shippedEvent = {
                type: 'ItemShipped',
                data: { orderId, productId: item.productId, quantity: item.quantity },
            };
            eventBus_1.eventBus.publish('ItemShipped', shippedEvent);
            // Simulate delivery
            const deliveredEvent = {
                type: 'ItemDelivered',
                data: { orderId, productId: item.productId },
            };
            eventBus_1.eventBus.publish('ItemDelivered', deliveredEvent);
        });
    }
}
exports.shippingService = new ShippingService();
//# sourceMappingURL=shippingService.js.map