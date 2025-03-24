import { Broker } from "./Broker";
import { Publisher } from "./Publisher";
import { Subscriber } from "./Subscriber";


const broker = new Broker();
const publisher = new Publisher(broker);
const subscriber1 = new Subscriber('1', broker);
const subscriber2 = new Subscriber('2', broker);
const subscriber3 = new Subscriber('3', broker);

subscriber1.subscribe('恐怖片');
subscriber2.subscribe('爱情电影');
subscriber3.subscribe('爱情电影');

publisher.publish('爱情电影', '肖申克的救赎');
publisher.publish('恐怖片', '咒怨');
publisher.publish('爱情电影', '阿甘正传');
publisher.publish('爱情电影', '泰坦尼克号');