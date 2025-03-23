type EventHandler<T> = (event: T) => void;

class EventBus {
    private handlers: { [key: string]: EventHandler<any>[] } = {};

    public subscribe<T>(eventType: string, handler: EventHandler<T>): void {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }

    public publish<T>(eventType: string, event: T): void {
        const handlers = this.handlers[eventType];
        if (handlers) {
            handlers.forEach(handler => handler(event));
        }
    }
}

export const eventBus = new EventBus();