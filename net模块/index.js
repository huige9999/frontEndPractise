/**
 * net模块创建一个服务器
 */
import net from 'net';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));



const server = net.createServer((socket) => {
    console.log('Client connected');
    
    socket.on('data', async (data) => {
        try {
            const bodyBuffer = await fs.readFile(path.resolve(__dirname, '1.webp'));
            const contentLength = bodyBuffer.length;
            const headerBuffer = Buffer.from(`HTTP/1.1 200 OK
Connection: close
Content-Type: image/png
Content-Length: ${contentLength}\r\n\r\n`, 'utf-8');
            const resBuffer = Buffer.concat([headerBuffer, bodyBuffer]);

            socket.write(resBuffer);
            socket.end();
        } catch (err) {
            console.error('Error:', err);
            const errorResponse = `HTTP/1.1 500 Internal Server Error\r\n\r\n${err.message}`;
            socket.write(errorResponse);
            socket.end();
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});