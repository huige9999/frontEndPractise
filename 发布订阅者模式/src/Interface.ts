import { Subscriber } from "./Subscriber";

export interface IPublisher {
    publish(topic:string,message: string): void;
}

export interface ISubscriber {
    subscribe(topic:string): void;
    unsubscribe(topic:string): void;
    receive(message: string): void;
}

export interface IBroker {
    publish(topic:string, message: any): void;
    subscribe(topic:string, subscriber: Subscriber): void;
    unsubscribe(topic:string, subscriber: Subscriber): void;
}