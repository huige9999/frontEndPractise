import fs, { read } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url";

// c:\\a\b\
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// c:\\a\b\abc.txt
const __filename = path.resolve(__dirname, "abc.txt");

const __targetfilename = path.resolve(__dirname, "abc-copy.txt");
    
const readStream = fs.createReadStream(__filename, {
    highWaterMark: 3
});

const writeStream = fs.createWriteStream(__targetfilename,{
    highWaterMark: 1,
});

readStream.pipe(writeStream);