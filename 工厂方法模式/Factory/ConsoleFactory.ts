import { ILogger } from "../Logger/ILogger";
import { ConsoleLogger } from "../Logger/ConsoleLogger";
import { IFactory } from "./IFactory";

export class ConsoleFactory implements IFactory {
    createLogger(): ILogger {
        return new ConsoleLogger();
    }
}