#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const self = path.resolve(__dirname);
const root = path.resolve(__dirname, '..', '..');
const execSync = require('child_process').execSync;
const exists = fs.existsSync || path.existsSync;
let pg = require('./package.json');
let rootPackagePath = root + '/package.json';
let rootEslintConfigPath = root + '/.eslint.config.js';
let selfEslintConfigPath = self + '/.eslint.config.js';
let rootEslintrcPath = root + '/.eslintrc.js';
let selfEslintrcPath = self + '/vue-eslint.js';
let rootEslintignorePath = root + '/.eslintignore';

console.log("install pre-commit");
try {
  execSync(`node ${root}/node_modules/pre-commit/install.js`);
} catch (e) {
  console.log(e);
}

console.log('install pre-commit-hook(version:' + pg.version + ')');

//处理package修改
let packageContent = null;
try {
  packageContent = fs.readFileSync(rootPackagePath, 'utf-8');
  packageContent = JSON.parse(packageContent);
} catch (e) {
  //do nothing
  console.log(e);
}
//定义添加内容
let baseConfig = {
  'pre-commit': [
    'eslint'
  ]
};
let scriptsConfig = {
  'precommit-msg': 'echo \'蘑菇租房前端“语法规范”自动提交扫描 ...\' && exit 0',
  'eslint': `npm run precommit-msg && /bin/bash ./node_modules/pre-commit-hooks/shell/eslint.sh`,
  'eslint-fix': `npm run precommit-msg && /bin/bash ./node_modules/pre-commit-hooks/shell/eslint.sh fix`,
  'eslint-fixdryrun': `npm run precommit-msg && /bin/bash ./node_modules/pre-commit-hooks/shell/eslint.sh fix-dry-run`,
  'eslint-desc': `npm run precommit-msg && /bin/bash ./node_modules/pre-commit-hooks/shell/eslint.sh desc`
};

if (packageContent !== null && typeof packageContent == 'object') {
  Object.assign(packageContent, baseConfig);
  Object.assign(packageContent.scripts, scriptsConfig);
  try {
    fs.writeFileSync(rootPackagePath, JSON.stringify(packageContent, null, 2), 'utf-8');
  } catch (e) {
    //do nothing
    console.log(e);
  }
}

//copy .eslint.config.js -> .eslint.config.js
try {
  if (!exists(rootEslintConfigPath)) {
    execSync(`cp ${selfEslintConfigPath} ${rootEslintConfigPath}`);
  }
} catch (e) {
  console.log(e);
}

//创建.eslintignore
try {
  execSync(`touch ${rootEslintignorePath}`);
} catch (e) {
  console.log(e);
}

//copy vue-eslint.js -> .eslintrc.js
try {
  execSync(`cp -f ${selfEslintrcPath} ${rootEslintrcPath}`);
} catch (e) {
  console.log(e);
}