#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const os = require("os");
const execSync = require('child_process').execSync;
const exists = fs.existsSync || path.existsSync;
const self = path.resolve(__dirname, '..');
let selfPackagePath = self + '/package.json';

let packageContent;
try {
  packageContent = fs.readFileSync(selfPackagePath, 'utf-8');
  packageContent = JSON.parse(packageContent);
  let outputContent = JSON.stringify({
    devDependencies : packageContent.devDependencies
  }, null, 2);
  let home = os.homedir();
  let repositoryPackageJson=home + "/.pre-commit-hooks-repository/package.json"
  fs.writeFileSync(repositoryPackageJson, outputContent, 'utf-8');
  console.log("success:", "创建成功" +repositoryPackageJson)
} catch(e) {
  console.log(e);
  console.log("fail:", "创建失败" +repositoryPackageJson)
}