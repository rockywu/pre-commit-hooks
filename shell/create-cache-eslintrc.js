#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const execSync = require('child_process').execSync;
const exists = fs.existsSync || path.existsSync;
const tmpEslintrcPath= process.argv[2];
const self = path.resolve(__dirname, '..');
const root = path.resolve(__dirname, '..', '..', '..');
let rootEslintrcPath = root + '/.eslintrc.js';
let selfEslintrcPath = self + '/vue-eslint.js';
/**
 * 创建eslint合并非统一配置
 */
try {
  //当开发分支下不存在.eslintrc.js时进行copy动作
  if (!exists(rootEslintrcPath)) {
    execSync(`cp ${selfEslintrcPath} ${tmpEslintrcPath}`);
  } else {
    //存在.eslintrc.js时，使用标准配置进行合并
    let rootEslintrcConfig = require(rootEslintrcPath);
    let selfEslintrcConfig = require(selfEslintrcPath);
    let eslintrcContent = Object.assign({}, rootEslintrcConfig, selfEslintrcConfig);
    fs.writeFileSync(tmpEslintrcPath, "module.exports = "+ JSON.stringify(eslintrcContent, null, 2) + ";", 'utf-8');
  }
  console.log("Success:", "创建成功 " + tmpEslintrcPath +",并且合并历史配置")
} catch(e) {
  console.log(e);
  console.log("fail:", "创建失败 " + tmpEslintrcPath);
  process.exit(1);
}
process.exit(0);
