import { IBroker, ISubscriber } from "./Interface";

export class Broker implements IBroker {
    private topics: Map<string, ISubscriber[]> = new Map();
    publish(topic: string, message: any): void {
       const topicSubscribers = this.topics.get(topic) || [];
       for(const subscriber of topicSubscribers) {
           subscriber.receive(message);
       }
    }
    subscribe(topic: string, subscriber: any): void {
        const topicSubscribers = this.topics.get(topic) || [];
        topicSubscribers.push(subscriber);
        this.topics.set(topic, topicSubscribers);
    }
    unsubscribe(topic: string, subscriber: any): void {
      const topicSubscribers = this.topics.get(topic) || [];
      const index = topicSubscribers.indexOf(subscriber);
      if(index !== -1) {
          topicSubscribers.splice(index, 1);
          this.topics.set(topic, topicSubscribers);
      }
    }
}