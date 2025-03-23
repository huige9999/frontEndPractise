import { ConsoleFactory } from "./Factory/ConsoleFactory";
import { DatabaseFactory } from "./Factory/DatabaseFactory";
import { FileFactory } from "./Factory/FileFactory";


const consoleFactory = new ConsoleFactory();
const databaseFactory = new DatabaseFactory();
const fileFactory = new FileFactory();

consoleFactory.createLogger().log('Console log');
databaseFactory.createLogger().log('Database log');
fileFactory.createLogger().log('File log');