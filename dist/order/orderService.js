"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const eventBus_1 = require("../events/eventBus");
class OrderService {
    constructor() {
        eventBus_1.eventBus.subscribe('StockReserved', this.handleStockReserved.bind(this));
        eventBus_1.eventBus.subscribe('OutOfStock', this.handleOutOfStock.bind(this));
    }
    placeOrder(orderId, items) {
        const event = {
            type: 'OrderPlaced',
            data: { orderId, items },
        };
        eventBus_1.eventBus.publish('OrderPlaced', event);
    }
    handleStockReserved(event) {
        // Logic to handle stock reserved
        // For simplicity, we assume all items are ready for shipping
        const orderId = 'order1'; //sample orderid
        const items = event.data;
        const readyEvent = {
            type: 'OrderReadyForShipping',
            data: { orderId, items },
        };
        eventBus_1.eventBus.publish('OrderReadyForShipping', readyEvent);
    }
    handleOutOfStock(event) {
        // Logic to handle out of stock items
        console.log(`Out of stock for product ${event.data.productId}. Requested: ${event.data.requested}, Available: ${event.data.available}`);
        // Here you could implement backorder logic or notify the user
    }
}
exports.orderService = new OrderService();
//# sourceMappingURL=orderService.js.map