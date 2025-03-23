// 日志接口
interface Logger {
    log(message: string): void;
}

// 控制台的形式记录日志
class ConsoleLogger implements Logger {
    log(message: string) {
        console.log('控制台日志：', message);
    }
}

// 文件的形式记录日志
class FileLogger implements Logger {
    log(message: string): void {
        console.log('文件日志：', message);
    }
}

// 数据库的形式记录日志
class DatabaseLogger implements Logger {
    log(message: string): void {
        console.log('数据库日志：', message);
    }
}

class SimpleFactory {
    static createLogger(type: string): Logger {
        if(type === 'console') {
            return new ConsoleLogger();
        } else if(type === 'file') {
            return new FileLogger();
        } else if(type === 'database') {
            return new DatabaseLogger();
        } else {
            throw new Error('type error');
        }
    }
}