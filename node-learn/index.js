import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class MyFile {
  constructor(filename,name,ext,isFile,currentTime,updateTime) {
    this.filename = filename;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.currentTime = currentTime;
    this.updateTime = updateTime;
  }

  getChildren() {}

  getContent(isBuffer = false) {

  }
}

/**
 * 读取目录下的子文件/目录成MyFile对象
 * 说明：第一版不需要递归
 * @param {*} dest 
 * @returns {Promise<Array<MyFile>>}
 */
async function readDir(dest) {
   
}


async function main() {
  const dest = path.resolve(__dirname,'./src');
  const result = await readDir(dest);
  console.log(result);
}

main();
