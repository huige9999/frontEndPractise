import { IBroker, IPublisher } from "./Interface";

export class Publisher implements IPublisher {
    private broker: IBroker;
    constructor(broker: IBroker) {
        this.broker = broker;
    }
    publish(topic: string, message: string): void {
        console.log(`发布者发了一个${topic}主题的消息：${message}`);
        this.broker.publish(topic, message);
    }

}