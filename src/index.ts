import express, { Request, Response, NextFunction } from 'express'; // Import types
import { orderService } from './order/orderService';
import { CustomError } from './errors/CustomError';


const app = express();
const PORT = 4000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Welcome route
app.get('/', (_req: Request, res: Response) => {
    res.send("Welcome to Ayyama Ordering System");
});

// Example endpoint to place an order
app.post('/orders', async (req: Request, res: Response, next: NextFunction) => {
    const { orderId, items } = req.body;

    try {
        // Call the order service to place the order
        await orderService.placeOrder(orderId, items);
        res.status(201).send({ message: 'Order placed successfully' });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// Error handling middleware
app.use((err: unknown, _req: Request, res: Response) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ error: err.message });
    } else if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).send({ error: 'Something went wrong!' });
    } else {
        console.error('Unexpected error:', err);
        res.status(500).send({ error: 'Something went wrong!' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Main function to place orders (for testing or initial setup)
const main = async () => {
    try {
        // Place a fully fulfillable order
        await orderService.placeOrder('order1', [
            { productId: '1', quantity: 5 },
        ]);

        // Place a partially fulfillable order
        await orderService.placeOrder('order2', [
            { productId: '1', quantity: 6 }, // This will exceed available stock
            { productId: '2', quantity: 1 }, // This is out of stock
        ]);

        // Simulate a delay to allow asynchronous processing
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
        console.error('Error placing orders:', error);
    }
};

main();