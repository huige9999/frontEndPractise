import { IBroker, ISubscriber } from "./Interface";

export class Subscriber implements ISubscriber {
    private broker: IBroker;
    private id: string;
    constructor(id: string, broker: IBroker) {
        this.id = id;
        this.broker = broker;
    }
    subscribe(topic: string): void {
       this.broker.subscribe(topic, this);
    }
    unsubscribe(topic: string): void {
       this.broker.unsubscribe(topic, this);
    }
    receive(message: string): void {
        console.log(`订阅者${this.id}收到了消息：${message}`);
    }

}