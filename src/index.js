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
const orderService_1 = require("./order/orderService");
// Example usage
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Place a fully fulfillable order
    orderService_1.orderService.placeOrder('order1', [
        { productId: '1', quantity: 5 },
    ]);
    // Place a partially fulfillable order
    orderService_1.orderService.placeOrder('order2', [
        { productId: '1', quantity: 6 }, // This will exceed available stock
        { productId: '2', quantity: 1 }, // This is out of stock
    ]);
    // Simulate a delay to allow asynchronous processing
    yield new Promise(resolve => setTimeout(resolve, 1000));
});
main();
