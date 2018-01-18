#!/usr/bin/env node
/**
 * Created by rocky on 2018/1/18.
 * 合并eslintrc规则，并生成文件到指定路径
 */
var path = require('path');
var fs = require('fs');
var execSync = require('child_process').execSync;
var exists = fs.existsSync || path.existsSync;
//项目仓库中自带的eslintrc路径
var privateEslintrcPath = process.argv[2];
//认证过的eslintrc路径
var authEslintrcPath = process.argv[3];
//生成扫描工具使用的eslintrc路径
var cacheEslintrcPath = process.argv[4];

if (!authEslintrcPath || !privateEslintrcPath || !cacheEslintrcPath) {
  process.exit(1);
}

/**
 * 创建eslint合并非统一配置
 */
try {
  //当开发分支下不存在.eslintrc.js时进行copy动作
  if (!exists(privateEslintrcPath)) {
    execSync(`cp ${authEslintrcPath} ${cacheEslintrcPath}`);
  } else {
    //存在.eslintrc.js时，使用标准配置进行合并
    var content = Object.assign({}, require(privateEslintrcPath), require(authEslintrcPath));
    //手动屏蔽eslint-plugin-html规则
    if (content.plugins instanceof Array) {
      content.plugins = content.plugins.filter(function (val) {
        return val != 'html' && val != 'eslint-plugin-html';
      });
    }
    fs.writeFileSync(cacheEslintrcPath, 'module.exports = ' + JSON.stringify(content, null, 2) + ';', 'utf-8');
  }
} catch (e) {
  console.log(e);
  process.exit(1);
}
process.exit(0);
