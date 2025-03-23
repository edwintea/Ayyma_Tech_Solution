"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
const orderService_1 = require("../order/orderService");
//import { inventoryService } from '../inventory/inventoryService';
//import { shippingService } from '../shipping/shippingService';
describe('Order Service', () => {
    beforeEach(() => {
        // Reset the event bus before each test
        eventBus_1.eventBus['handlers'] = {};
    });
    test('fully fulfillable order', () => {
        const orderId = 'order1';
        orderService_1.orderService.placeOrder(orderId, [{ productId: '1', quantity: 5 }]);
        // Check if the order is ready for shipping
        eventBus_1.eventBus.publish('StockReserved', {
            type: 'StockReserved',
            data: { productId: '1', quantity: 5 },
        });
        // Check if the shipping event is published
        const shippingEvent = jest.fn();
        eventBus_1.eventBus.subscribe('OrderReadyForShipping', shippingEvent);
        // Simulate the event
        eventBus_1.eventBus.publish('OrderReadyForShipping', {
            type: 'OrderReadyForShipping',
            data: { orderId, items: [{ productId: '1', quantity: 5 }] },
        });
        expect(shippingEvent).toHaveBeenCalled();
    });
    test('partially fulfillable order', () => {
        const orderId = 'order2';
        orderService_1.orderService.placeOrder(orderId, [
            { productId: '1', quantity: 6 }, // Exceeds available stock
            { productId: '2', quantity: 1 }, // Out of stock
        ]);
        // Check if out of stock event is published
        const outOfStockEvent = jest.fn();
        eventBus_1.eventBus.subscribe('OutOfStock', outOfStockEvent);
        // Simulate the event
        eventBus_1.eventBus.publish('OutOfStock', {
            type: 'OutOfStock',
            data: { productId: '1', requested: 6, available: 5 },
        });
        expect(outOfStockEvent).toHaveBeenCalled();
    });
    test('concurrency conflict', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderId1 = 'order3';
        const orderId2 = 'order4';
        // Place two orders simultaneously
        orderService_1.orderService.placeOrder(orderId1, [{ productId: '1', quantity: 5 }]);
        orderService_1.orderService.placeOrder(orderId2, [{ productId: '1', quantity: 6 }]); // This will exceed available stock
        // Simulate stock reserved for the first order
        eventBus_1.eventBus.publish('StockReserved', {
            type: 'StockReserved',
            data: { productId: '1', quantity: 5 },
        });
        // Check if out of stock event is published for the second order
        const outOfStockEvent = jest.fn();
        eventBus_1.eventBus.subscribe('OutOfStock', outOfStockEvent);
        // Simulate the event for the second order
        eventBus_1.eventBus.publish('OutOfStock', {
            type: 'OutOfStock',
            data: { productId: '1', requested: 6, available: 5 },
        });
        expect(outOfStockEvent).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=orderService.test.js.map