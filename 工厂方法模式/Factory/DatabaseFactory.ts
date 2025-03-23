import { ILogger } from '../Logger/ILogger';
import { DatabaseLogger } from '../Logger/DatabaseLogger';
import { IFactory } from './IFactory';

export class DatabaseFactory implements IFactory {
    createLogger(): ILogger {
        return new DatabaseLogger();
    }

}