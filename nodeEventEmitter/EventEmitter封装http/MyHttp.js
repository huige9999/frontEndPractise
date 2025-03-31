import EventEmitter from 'events'
import http from 'http'



export default class extends EventEmitter {
  constructor(url,options) {
    super();
    this.url = url;
    this.options = options || {};
  }

 send(body = '') {
    const req = http.request(options, (res) => {
        // 处理响应
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            this.emit('res', data);
        });
    });
    req.write(body);
    req.end();
 }
}