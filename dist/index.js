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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import types
const orderService_1 = require("./order/orderService");
const CustomError_1 = require("./errors/CustomError");
const app = (0, express_1.default)();
const PORT = 4000;
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Welcome route
app.get('/', (_req, res) => {
    res.send("Welcome to Ayyama Ordering System");
});
// Example endpoint to place an order
app.post('/orders', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, items } = req.body;
    try {
        // Call the order service to place the order
        yield orderService_1.orderService.placeOrder(orderId, items);
        res.status(201).send({ message: 'Order placed successfully' });
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}));
// Error handling middleware
app.use((err, _req, res) => {
    if (err instanceof CustomError_1.CustomError) {
        res.status(err.statusCode).send({ error: err.message });
    }
    else if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).send({ error: 'Something went wrong!' });
    }
    else {
        console.error('Unexpected error:', err);
        res.status(500).send({ error: 'Something went wrong!' });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Main function to place orders (for testing or initial setup)
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Place a fully fulfillable order
        yield orderService_1.orderService.placeOrder('order1', [
            { productId: '1', quantity: 5 },
        ]);
        // Place a partially fulfillable order
        yield orderService_1.orderService.placeOrder('order2', [
            { productId: '1', quantity: 6 }, // This will exceed available stock
            { productId: '2', quantity: 1 }, // This is out of stock
        ]);
        // Simulate a delay to allow asynchronous processing
        yield new Promise(resolve => setTimeout(resolve, 1000));
    }
    catch (error) {
        console.error('Error placing orders:', error);
    }
});
main();
//# sourceMappingURL=index.js.map