import { ILogger } from "../Logger/ILogger";

export interface IFactory {
    createLogger(): ILogger;
}