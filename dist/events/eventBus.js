"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = void 0;
class EventBus {
    constructor() {
        this.handlers = {};
    }
    subscribe(eventType, handler) {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }
    publish(eventType, event) {
        const handlers = this.handlers[eventType];
        if (handlers) {
            handlers.forEach(handler => handler(event));
        }
    }
}
exports.eventBus = new EventBus();
//# sourceMappingURL=eventBus.js.map