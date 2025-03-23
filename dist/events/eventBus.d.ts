type EventHandler<T> = (event: T) => void;
declare class EventBus {
    private handlers;
    subscribe<T>(eventType: string, handler: EventHandler<T>): void;
    publish<T>(eventType: string, event: T): void;
}
export declare const eventBus: EventBus;
export {};
