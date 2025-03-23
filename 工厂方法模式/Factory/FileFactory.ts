import { ILogger } from "../Logger/ILogger";
import { FileLogger } from "../Logger/FileLogger";
import { IFactory } from "./IFactory";



export class FileFactory implements IFactory {
    createLogger(): ILogger {
        return new FileLogger();
    }

}