import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class MyFile {
  constructor(filename,name,ext,isFile,size,currentTime,updateTime) {
    this.filename = filename;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.currentTime = currentTime;
    this.updateTime = updateTime;
  }

  async getChildren() {
    if(this.isFile) {
      return [];
    } else {
      const res = await fs.promises.readdir(this.filename);
      return Promise.all(res.map((item) => MyFile.getMyFile(path.resolve(this.filename,item))));
    }
  }

  async getContent(isBuffer = false) {
    if(this.isFile) {
      if(isBuffer) {
        return await fs.promises.readFile(this.filename);
      }
      return await fs.promises.readFile(this.filename,'utf-8');
    } else {
      return '';
    }
  }

  static async getMyFile(filename) {
    const res = await fs.promises.stat(filename);
    const name = path.basename(filename);
    const ext = path.extname(filename);
    const isFile = res.isFile();
    const size = res.size;
    const currentTime = new Date(res.birthtimeMs);
    const updateTime = new Date(res.mtimeMs);
    return new MyFile(filename,name,ext,isFile,size,currentTime,updateTime);
  }
}

/**
 * 读取目录下的子文件/目录成MyFile对象
 * @param {*} dest 
 * @returns {Promise<Array<MyFile>>}
 */
async function readDir(dest) {
   const file = await MyFile.getMyFile(dest);
   return await file.getChildren();
}


async function main() {
  const dest = path.resolve(__dirname,'./src');
  const result = await readDir(dest);
  console.log(result);
}

main();
