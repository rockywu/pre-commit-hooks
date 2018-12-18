#!/usr/bin/env node
/**
 * Created by rocky on 2018/1/18.
 * 合并eslintrc规则，并生成文件到指定路径
 */
var fs = require('fs');
//项目仓库中自带的eslintrc路径
var projectEslintrcPath = process.argv[2];
//认证过的eslintrc路径
var authEslintrcPath = process.argv[3];
//生成扫描工具使用的eslintrc路径
var cacheEslintrcPath = process.argv[4];

if (!authEslintrcPath || !projectEslintrcPath || !cacheEslintrcPath) {
  process.exit(1);
}

var content;
try {
  content = require(projectEslintrcPath);
} catch (e) {
  //项目中eslintrc不存在
}
var authContent = require(authEslintrcPath);

/**
 * 创建eslint合并非统一配置
 */
try {
  //存在.eslintrc.js时，使用标准配置进行合并
  var projectGlobals = content.globals || {};
  var authGlobals = authContent.globals || {};
  content = Object.assign({}, authContent, {
    globals : Object.assign({}, projectGlobals, authGlobals)
  });
  //手动屏蔽eslint-plugin-html规则
  if (content.plugins instanceof Array) {
    content.plugins = content.plugins.filter(function (val) {
      return val != 'html' && val != 'eslint-plugin-html';
    });
  }
  fs.writeFileSync(cacheEslintrcPath, 'module.exports = ' + JSON.stringify(content, null, 2) + ';', 'utf-8');
} catch (e) {
  console.log(e);
  process.exit(1);
}
process.exit(0);
