class AppConfig {
    private static _instance: AppConfig;
    public readonly apiUrl: string;
    public readonly apiKey: string;
    // 其他配置项
    private constructor() {
        this.apiUrl = 'https://api.example.com';
        this.apiKey = 'your_api_key_here';
        // 初始化其他配置项
    }

    public static getInstance(): AppConfig {
        if (!AppConfig._instance) {
            AppConfig._instance = new AppConfig();
        }
        return AppConfig._instance;
    }
}

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();
console.log(config1 === config2); // true
console.log(config1.apiUrl); // https://api.example.com