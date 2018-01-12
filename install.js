#!/usr/bin/env node
const fs = require('fs');

//处理package修改
let packageContent = null;
try {
  packageContent = fs.readFileSync('./package.json', 'utf-8');
  packageContent = JSON.parse(packageContent);
} catch (e) {
  //do nothing
  console.log(e);
}
//定义添加内容
let baseConfig = {
  'pre-commit': [
    'precommit-msg',
    'eslint'
  ]
};
let scriptsConfig = {
  'precommit-msg': 'echo \'Pre-commit checks...\' && exit 0',
  'eslint': 'exit 0'
};

if (packageContent !== null && typeof packageContent == 'object') {
  Object.assign(packageContent, baseConfig);
  Object.assign(packageContent.scripts, scriptsConfig);
  try {
    fs.writeFileSync('./package.test.json', JSON.stringify(packageContent, null, 2), 'utf-8');
  } catch (e) {
    //do nothing
    console.log(e);
  }
}


//copy .eslint.config.js -> .eslint.config.js
try {
  execSync("cp -i ./node_modules/pre-commit-hooks/.eslint.config.js .eslint.config.js");
} catch (e) {
  console.log(e);
}


const execSync = require("child_process").execSync;
//创建.eslintignore
try {
  execSync("touch .eslintignore");
} catch(e) {
  console.log(e);
}

//copy vue-eslint.js -> .eslintrc.js
try {
  execSync("cp -i ./node_modules/pre-commit-hooks/vue-eslint.js .eslintrc.js");
} catch (e) {
  console.log(e);
}

console.log("install pre-commit-hooks");



