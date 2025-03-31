export default class {
    constructor() {
        this.events = new Map();
    }

    on(name,callback) {
        if (!this.events.has(name)) {
            this.events.set(name, []);
        }
        this.events.get(name).push(callback);
    }

    off(name, callback) {
        if(this.events.has(name)) {
            const  listeners = this.events.get(name);
            const index = listeners.indexOf(callback);
            if(index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    emit(name, ...args) {
        if(this.events.has(name)) {
            const listenters = this.events.get(name);
            for (const listener of listenters) {
                listener(...args);
            }
        } else {
            console.warn(`Event ${name} does not exist`);
        }
    }

    getListenterCounts(name) {
        if(this.events.has(name)) {
            return this.events.get(name).length;
        } else {
            return 0;
        }
    }
}
