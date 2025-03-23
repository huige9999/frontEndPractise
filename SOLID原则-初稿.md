# SOLID原则
## 原则和设计模式的关系
原则是一种标准，设计模式是对原则的具体实现。

## 什么是SOLID原则

S表示：Single responsibility principle 单一职责原则
O表示: Open-closed principle 开闭原则
L表示：Liskov substitution principle 里氏替换原则
I表示：Interface segregation principle 接口隔离原则
D表示：Dependency inversion principle 依赖倒置原则

## 单一职责原则

### 什么是单一职责原则
一个类应该只负责一项任务
如果一个类有多个任务就会导致修改一个功能的时候，影响其他功能。

例子：
假设我们现在有一个应用，该应用需要记录一些日志：

```ts
// 这种设计就是不好的，因为你的日志逻辑和订单业务逻辑混合在了一起
class OrderProcessor {
    processOrder(orderId: number) {
      	// 进行日志的记录
        console.log(`Processing order ${orderId}`); 
      	// 订单处理的业务逻辑
    }
}
```

如果按照单一职责原则，我们就应该将日志记录的职责从 OrderProcessor 类里面分离出来，创建一个专门用于日志记录的类：

```ts
// 这个类就是专门负责日志记录
class Logger {
    log(message: string) {
        console.log(message); 
    }
}

class OrderProcessor {
    private logger: Logger = new Logger();
    
    processOrder(orderId: number) {
        this.logger.log(`Processing order ${orderId}`);
    }
}
```

### 不需要单一职责的情况
1. 比如，如果一个需求的变化，有两个职责总是同时变化的，那就不必分离它们

举个例子，在进行 ajax 请求的时候，创建 xhr 对象和发送 xhr 请求几乎都是在一起的，那么此时创建 xhr 对象的职责和发送 xhr 请求的职责就没必要分开。

2. 只有在职责确定要发生变化的时候，此时分离才有意义。如果两个职责耦合在一起，但是这两个职责没有发生变化的征兆，我们也不需要进行分离。

## 开闭原则

### 什么是开闭原则

通过扩展来添加新的功能，而不是修改已有的代码。这样就可以减少因为修改旧代码引入新错误的风险

举个例子:
假设我们现在在开发一个应用，该应用中需要将日志记录到不同的地方：

- 文件
- 数据库
- 发送到远程的日志服务器

```ts
class Logger {
  log(message: string) {
      if(type === "FileLog"){
        // 文件形式的日志记录
      } else if(type === "Database") {
        // 以数据库的形式来进行日志记录
      }
  }
}
```

上面的设计就是一个不好的设计，如果要增加新的日志记录的方式，那么就需要修改原来类里面的 log 方法。

更好的设计，就是去遵循开闭原则，在原来类的基础上进行一个扩展：

```js
interface LogStrategy {
    log(message: string): void;
}

// 这里一种日志记录方式对应的就是一个类
class ConsoleLogStrategy implements LogStrategy {
    log(message: string) {
        console.log(message);
    }
}

class FileLogStrategy implements LogStrategy {
    log(message: string) {
    }
}

// 后面如果想要新增新的日志记录方式，只需要去扩展新的类即可

class Logger {
  	// 初始化的时候确定日志记录的策略是什么
    constructor(private logStrategy: LogStrategy) {}

    log(message: string) {
        this.logStrategy.log(message);
    }
}
```

在这个例子中，Logger 类是通过依赖注入的形式注入 LogStrategy 接口，而非具体的日志实现，这里就遵循开放封闭原则。当需要添加新的记录方式的时候，只需要新增类，并且新的类去实现  LogStrategy 接口即可，无需修改 Logger 类的代码。

## 里氏替换原则

### 什么是里氏替换原则

在值传递的地方：子类可以赋值给父类，这是安全的操作，因为子类完全实现了父类的行为

如我们要开发一个文本编辑器，该编辑器需要支持不同的文件格式解析。

这个时候我们就可以设计一个通用的接口，例如 FileParser，之后各种插件或者扩展作为子类来实现该接口。

示例代码如下：

```ts
// 基类定义通用接口
// 回头各个子类需要实现该接口
abstract class FileParser {
  // 一个抽象方法，用于解析文件
  abstract parse(content: string): any;
}

// 子类实现特定格式的解析
// 解析 JSON 文件格式
class JSONParser extends FileParser {
  // 实现具体的 parse 方法，也就是如何解析 JSON 文件
  parse(content: string) {
    return JSON.parse(content);
  }
}

// 解析 XML 文件格式
class XMLParser extends FileParser {
  parse(content: string) {
    // XML 解析逻辑
    console.log("Parsing XML content");
    return {};
  }
}

// 文本编辑器使用 FileParser 插件来处理文件
// 接收 parser 参数的类型为 FileParser，这意味着上面的子类都可以传递进来
function openFile(parser: FileParser, fileContent: string) {
  const data = parser.parse(fileContent);
  console.log("File opened and parsed:", data);
}

// 不同的文件格式可以通过不同的解析器透明替换
const jsonParser = new JSONParser();
const xmlParser = new XMLParser();

openFile(jsonParser, '{"name":"John"}'); // 使用 JSON 解析器
openFile(xmlParser, "<name>John</name>"); // 使用 XML 解析器
```

上面的这种设计方式会更加灵活，回头需要新增某一种文件解析方式，直接新增一个子类，让该子类继承 FileParser 父类即可。openFile 这个方法内部的核心业务逻辑不需要做任何的更改。

## 接口隔离原则
### 什么是接口隔离原则
将一个臃肿的接口，进行分割，分割成更小的更具体的接口，这样做的好处在于，用户只需要依赖他们需要的接口。

比如有这么一个例子：

假设我们正在开发一个工作流处理系统，其中包含多种类型的任务，如<u>数据分析</u>、<u>报告生成</u>和<u>邮件发送</u>等。

一个不遵循 ISP 的设计：

```ts
interface ITask {
  processData(): void;
  generateReport(): void;
  sendEmail(): void;
}

class DataAnalysisTask implements ITask {
  processData(){
    // 具体实现
  }
  // 但是，剩下两个方法对于我当前这个类来讲，是不需要的
  generateReport() {
    throw new Error("Not implemented");
  }
  sendEmail() {
    throw new Error("Not implemented");
  }
}
```

一个比较好的设计，就是遵循 ISP，将接口进行分离：

```ts
// 负责数据处理的接口
interface IDataProcessor {
  processData(): void;
}

// 负责生成报告的接口
interface IReportGenerator {
  generateReport(): void;
}

// 负责发送邮件的接口
interface IEmailSender {
  sendEmail(): void;
}

// 之后哪一个类需要用到哪些功能，再去实现具体的接口即可
class DataAnalysisTask implements IDataProcessor {
  processData() {
    console.log("Processing data...");
  }
}

class ReportTask implements IReportGenerator {
  generateReport() {
    console.log("Generating report...");
  }
}

class EmailTask implements IEmailSender {
  sendEmail() {
    console.log("Sending email...");
  }
}
```

在改进的设计中，我们将 ITask 接口拆分成了三个具体的接口，每个任务类只需要实现对应的接口即可。

## 依赖倒置原则
这条原则主要规定了：

- 高层模块不应该依赖于低层模块的实现细节，两者都应该依赖于中间的抽象层
- 抽象不应该依赖于细节，而细节应该依赖于抽象

这条原则鼓励我们在进行接口设计的时候，依赖于接口或者抽象类，而非具体的实现。也就是你经常听到的面向接口编程。

一个关于依赖倒置的很好的例子，后端在书写数据库操作的代码的时候，一般就会抽象出来一层。

先来看一个不遵循 DIP 的例子：

```ts
class MySQLUserRepository {
  connect() {
    console.log("Connecting to MySQL database...");
  }

  getUser(id: number) {
    // 实现从 MySQL 数据库获取用户的逻辑
    console.log(`Getting user ${id} from MySQL database.`);
    return { id: id, name: "John Doe" };
  }
}

class UserService {
  // UserService 这个类就依赖于 MySQLUserRepository 这个类
  // 而 MySQLUserRepository 这个类的内部是使用 MySQL 进行数据库相关的操作
  private userRepository = new MySQLUserRepository();

  getUser(id: number) {
    this.userRepository.connect();
    return this.userRepository.getUser(id);
  }
}
```

这种设计会存在以下的问题：

- 高耦合：UserService 和 MySQLUserRepository 两者之间是耦合的，现在如果我们想要修改数据库（将 MySQL 修改为 MongoDB），那么还需要修改 UserService 这个类的代码。
- 难以测试：UserService 依赖的是具体的数据库实现，所以非常难以进行单元测试，你需要访问真实的数据库来进行测试。
- 难以扩展：这种设计方式没有办法支持多种数据库，也没有办法添加中间的缓存层。

接下来我们遵循 DIP 原则，我们可以引入一个抽象层（中间层）来定义数据访问的约束，从而解耦业务逻辑和数据访问的具体实现。

```ts
// 首先这里多了一个接口
interface IUserRepository {
  connect(): void;
  getUser(id: number): any;
}

// 这个类是使用 MySQL 数据
// 这个类会去实现 IUserRepository 接口
class MySQLUserRepository implements IUserRepository {
  connect() {
    console.log("Connecting to MySQL database...");
  }

  getUser(id: number) {
    // 实现从MySQL数据库获取用户的逻辑
    console.log(`Getting user ${id} from MySQL database.`);
    return { id: id, name: "John Doe" };
  }
}

// UserService 代码不需要改变
// UserService 不再依赖具体的实现类
// 而是依赖 IUserRepository 接口
// 换句话说，只要实现了 IUserRepository 的类都可以传入到 UserService
class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  getUser(id: number) {
    this.userRepository.connect();
    return this.userRepository.getUser(id);
  }
}
```

通过上面的设计，我们能看到这样的一些好处：

- 降低耦合：UserService 和 MySQLUserRepository 这两个类不再是耦合在一起的，UserService 不再关心具体的数据库操作是怎样的，只要是满足 IUserRepository 接口的类都可以。这样就能非常轻松的实现数据库的切换。
- 易于测试：因为现在不再是依赖具体的数据库操作的类，而是依赖接口，因此在测试的时候，我们只需要提供一个同样实现了 IUserRepository 接口的 Mock 数据即可。
- 提高扩展性：现在可以非常轻松的切换数据库，也可以非常轻松的添加缓存层。



- 高层模块：高层模块指的就是包含业务逻辑或者系统核心的部分，在上面的例子中，就是 UserService
- 底层模块：低层模块指的是直接与数据库交互，具体数据操作相关的实现部分。在上面的例子中，就是 MySQLUserRepository
- 抽象层：是一个中间层，一般是一个接口或者一个抽象类。在上面的例子中，就是 IUserRepository
