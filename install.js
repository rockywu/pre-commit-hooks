#!/usr/bin/env node
//获取系统信息
var path = require("path");
var os = require("os");
var mkdirp = require("mkdirp");
var print = require("./print");
var fs = require("fs")

var mergeEslintrc = require("./shell/merge-eslintrc");
var mergePackage = require("./shell/merge-package");
var updateEslintrc = require("./shell/update-eslintrc");
var platform = os.platform();
var isWindows = platform.toString().toLowerCase() == "win32"
var basePath = __dirname;
var projectPath = path.resolve(basePath, "../", "../");
var exitCode = 0;
var usePrint;

print.message(`(您的当前系统为：${isWindows ? "Windows系统" : "非Windows系统"})`)

/**
 * 通过状态值打印
 * @param label
 * @returns {Function}
 */
function printState(label) {
  return function(state, message) {
    if(state === null) {
      print.message(label, message);
    } else if(state === 0) {
      print.success(label, message);
    } else {
      print.error(label, message);
    }
  }
}

//合并package.json
usePrint = printState("(pre-commit-hooks 合并package.json)");
usePrint(null);//打印基本消息
exitCode = mergePackage()
usePrint(exitCode);

//更新eslintrc.js
usePrint = printState("(pre-commit-hooks 更新eslintrc.js)");
usePrint(null);//打印基本消息
exitCode = updateEslintrc(path.resolve(basePath, "./shell/update-eslintrc.js"),
  path.resolve(basePath, "./package.json"),
  path.resolve(basePath, "./vue-eslintrc.js")
);
usePrint(exitCode);

//创建eslint应用
usePrint = printState("(eslint应用)");
var eslintPath = path.resolve(basePath, "./eslint-bin");
try {
  mkdirp.sync(eslintPath);
  fs.writeFileSync(path.resolve(eslintPath, "./package.json"), JSON.stringify({
    devDependencies: {},
    dependencies: {}
  }, null, 2), 'utf-8')
} catch(e) {
  usePrint(1, "eslint应用创建失败");
  process.exit(1);
}
var packages=["babel-eslint", "eslint", "eslint-codeframe-formatter", "eslint-config-standard",
  "eslint-friendly-formatter", "eslint-plugin-import", "eslint-plugin-node", "eslint-plugin-promise",
  "eslint-plugin-standard", "eslint-plugin-vue", "vue-eslint-parser"];

try {
  

} catch(e) {

}

//
// #创建eslint应用
// mkdir -p "$basePath/eslint-bin"
// cd "$basePath/eslint-bin"
// packages=" \
//     babel-eslint \
//     eslint \
//     eslint-codeframe-formatter \
//     eslint-config-standard \
//     eslint-friendly-formatter \
//     eslint-plugin-import \
//     eslint-plugin-node \
//     eslint-plugin-promise \
//     eslint-plugin-standard \
//     eslint-plugin-vue \
//     vue-eslint-parser";
//
// npmCommand=$(command -v cnpm);
// if [ -z "$npmCommand" ];then
// npm install --save-dev "$packages"
// else
// cnpm install --save-dev "$packages"
// fi
// yellowcolor "npm install --save-dev $packages"
//
// cd "$projectPath"
//
//
//

