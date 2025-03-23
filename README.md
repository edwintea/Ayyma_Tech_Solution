# Ayyma_Tech_Solution

# Order Shipping System

This project implements a simple order processing system using Node.js and TypeScript. It consists of three main services: Order Service, Inventory Service, and Shipping Service, which communicate through an in-memory event bus.

## Project Structure



## Requirements

1. **Repository Structure**: The code is organized into separate services for Inventory, Order, and Shipping, allowing for isolation and modularity.
2. **In-Memory Store**: An in-memory store is used to hold the state of inventory and orders.
3. **Event Bus**: An in-memory event bus is implemented to facilitate communication between services.
4. **TypeScript Practices**: Strong typing is enforced throughout the codebase, including domain objects and events.
5. **Testing**: The project includes tests for various scenarios using Jest.

## Overview of the Flow
- Order Placement: The OrderService receives a new order and publishes an OrderPlaced event.
- Inventory Check: The InventoryService listens for the OrderPlaced event, checks the inventory, and reserves stock if available. It    publishes either a StockReserved event or an OutOfStock event.
- Order Ready for Shipping: If the order is fulfillable, the OrderService publishes an OrderReadyForShipping event.
- Shipping Process: The ShippingService listens for the OrderReadyForShipping event, updates the status of items, and publishes ItemShipped and ItemDelivered events.

## Installation 

1. Clone the repository:
   ```bash
   git clone https://github.com/edwintea/Ayyma_Tech_Solution.git
   cd Ayyma_Tech_Solution


2. run installation of depedencies :
    npm install
    npm run build
    npm start

    or we can use docker for installation:
        docker compose build -t ayyama .
        docker compose up --build -d ---> running in background as daemon
    
3. run application :
    open postman :
    url : http://localhost:4000/orders
    method:post
    payload :
        {
        "orderId":1,
        "items":{
            "productId":1,
            "quantity":1
        }
    }

3. testing:
    npm test