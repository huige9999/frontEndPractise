import CustomEventEmitter from './CustomEventEmitter.js';


const eventEmitter = new CustomEventEmitter();
eventEmitter.on('event1', (data) => {
    console.log('event1 triggered with data:', data);
});

eventEmitter.on('event2', (data) => {
    console.log('event2 triggered with data:', data);
});

eventEmitter.emit('event1', { key: 'value' });
eventEmitter.emit('event2', { key: 'value' });