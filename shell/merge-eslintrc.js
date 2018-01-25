#!/usr/bin/env node
/**
 * Created by rocky on 2018/1/18.
 * 合并eslintrc规则，并生成文件到指定路径
 */
var fs = require('fs');

/**
 * 运行合并动作
 * @param authEslintrcPath 项目仓库中自带的eslintrc路径
 * @param projectEslintrcPath 认证过的eslintrc路径
 * @param cacheEslintrcPath 生成扫描工具使用的eslintrc路径
 * @returns {number}
 */
function run(authEslintrcPath, projectEslintrcPath, cacheEslintrcPath) {
  if (!authEslintrcPath || !projectEslintrcPath || !cacheEslintrcPath) {
    return 1;
  }

  var content;
  try {
    content = require(projectEslintrcPath);
  } catch (e) {
    //项目中eslintrc不存在
  }

  /**
   * 创建eslint合并非统一配置
   */
  try {
    //存在.eslintrc.js时，使用标准配置进行合并
    content = Object.assign({}, content || {}, require(authEslintrcPath));
    //手动屏蔽eslint-plugin-html规则
    if (content.plugins instanceof Array) {
      content.plugins = content.plugins.filter(function (val) {
        return val != 'html' && val != 'eslint-plugin-html';
      });
    }
    fs.writeFileSync(cacheEslintrcPath, 'module.exports = ' + JSON.stringify(content, null, 2) + ';', 'utf-8');
  } catch (e) {
    console.log(e);
    return 1;
  }
  return 0;
}

module.exports = function(projectEslintrcPath, authEslintrcPath, cacheEslintrcPath) {
  return run(projectEslintrcPath, authEslintrcPath, cacheEslintrcPath)
}

if(process.argv[2] && process.argv[3] && process.argv[4]) {
  process.exit(run(process.argv[2], process.argv[3], process.argv[4]));
}
