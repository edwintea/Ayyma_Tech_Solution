import { eventBus } from '../events/eventBus';
import { StockItem, StockReservedEvent, OutOfStockEvent } from './inventoryTypes';
import { OrderItem } from '../order/orderTypes'; // Import the OrderItem type

class InventoryService {
    private stock: StockItem[] = [];

    constructor() {
        // Initialize with some stock
        this.stock = [
            { productId: '1', quantity: 10 },
            { productId: '2', quantity: 0 },
        ];

        eventBus.subscribe('OrderPlaced', this.handleOrderPlaced.bind(this));
    }

    private handleOrderPlaced(event: any) {
        // Define the type for the items array
        const items: OrderItem[] = event.data.items;

        items.forEach((item: OrderItem) => { 
            const stockItem = this.stock.find(s => s.productId === item.productId);
            if (stockItem && stockItem.quantity >= item.quantity) {
                stockItem.quantity -= item.quantity;
                eventBus.publish<StockReservedEvent>('StockReserved', {
                    type: 'StockReserved',
                    data: { productId: item.productId, quantity: item.quantity },
                });
            } else {
                eventBus.publish<OutOfStockEvent>('OutOfStock', {
                    type: 'OutOfStock',
                    data: { productId: item.productId, requested: item.quantity, available: stockItem ? stockItem.quantity : 0 },
                });
            }
        });
    }
}

// Ensure you export the instance of InventoryService
export const inventoryService = new InventoryService();