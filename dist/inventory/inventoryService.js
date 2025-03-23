"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = void 0;
const eventBus_1 = require("../events/eventBus");
class InventoryService {
    constructor() {
        this.stock = [];
        // Initialize with some stock
        this.stock = [
            { productId: '1', quantity: 10 },
            { productId: '2', quantity: 0 },
        ];
        eventBus_1.eventBus.subscribe('OrderPlaced', this.handleOrderPlaced.bind(this));
    }
    handleOrderPlaced(event) {
        // Define the type for the items array
        const items = event.data.items;
        items.forEach((item) => {
            const stockItem = this.stock.find(s => s.productId === item.productId);
            if (stockItem && stockItem.quantity >= item.quantity) {
                stockItem.quantity -= item.quantity;
                eventBus_1.eventBus.publish('StockReserved', {
                    type: 'StockReserved',
                    data: { productId: item.productId, quantity: item.quantity },
                });
            }
            else {
                eventBus_1.eventBus.publish('OutOfStock', {
                    type: 'OutOfStock',
                    data: { productId: item.productId, requested: item.quantity, available: stockItem ? stockItem.quantity : 0 },
                });
            }
        });
    }
}
// Ensure you export the instance of InventoryService
exports.inventoryService = new InventoryService();
//# sourceMappingURL=inventoryService.js.map