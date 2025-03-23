import { eventBus } from '../events/eventBus';
import { orderService } from '../order/orderService';
//import { inventoryService } from '../inventory/inventoryService';
//import { shippingService } from '../shipping/shippingService';

describe('Order Service', () => {
    beforeEach(() => {
        // Reset the event bus before each test
        eventBus['handlers'] = {};
    });

    test('fully fulfillable order', () => {
        const orderId = 'order1';
        orderService.placeOrder(orderId, [{ productId: '1', quantity: 5 }]);

        // Check if the order is ready for shipping
        eventBus.publish('StockReserved', {
            type: 'StockReserved',
            data: { productId: '1', quantity: 5 },
        });

        // Check if the shipping event is published
        const shippingEvent = jest.fn();
        eventBus.subscribe('OrderReadyForShipping', shippingEvent);

        // Simulate the event
        eventBus.publish('OrderReadyForShipping', {
            type: 'OrderReadyForShipping',
            data: { orderId, items: [{ productId: '1', quantity: 5 }] },
        });

        expect(shippingEvent).toHaveBeenCalled();
    });

    test('partially fulfillable order', () => {
        const orderId = 'order2';
        orderService.placeOrder(orderId, [
            { productId: '1', quantity: 6 }, // Exceeds available stock
            { productId: '2', quantity: 1 }, // Out of stock
        ]);

        // Check if out of stock event is published
        const outOfStockEvent = jest.fn();
        eventBus.subscribe('OutOfStock', outOfStockEvent);

        // Simulate the event
        eventBus.publish('OutOfStock', {
            type: 'OutOfStock',
            data: { productId: '1', requested: 6, available: 5 },
        });

        expect(outOfStockEvent).toHaveBeenCalled();
    });

    test('concurrency conflict', async () => {
        const orderId1 = 'order3';
        const orderId2 = 'order4';

        // Place two orders simultaneously
        orderService.placeOrder(orderId1, [{ productId: '1', quantity: 5 }]);
        orderService.placeOrder(orderId2, [{ productId: '1', quantity: 6 }]); // This will exceed available stock

        // Simulate stock reserved for the first order
        eventBus.publish('StockReserved', {
            type: 'StockReserved',
            data: { productId: '1', quantity: 5 },
        });

        // Check if out of stock event is published for the second order
        const outOfStockEvent = jest.fn();
        eventBus.subscribe('OutOfStock', outOfStockEvent);

        // Simulate the event for the second order
        eventBus.publish('OutOfStock', {
            type: 'OutOfStock',
            data: { productId: '1', requested: 6, available: 5 },
        });

        expect(outOfStockEvent).toHaveBeenCalled();
    });
});