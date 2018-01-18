#!/usr/bin/env bash
#set -x
function get_base_path(){
    #bash get current file directory
    local DIR;
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    echo "$DIR";
}

myecho() {
    echo -e "\033[""$1""m""$2""\033[0m";
}

mkcolor()
{
    myecho "$1" "<<< $2 >>>"
}

errorcolor() {
    myecho 31 "fatal: $1"
}

usagecolor() {
    myecho 31 "$1"
}

yellowcolor() {
    mkcolor 33 "$1"
}

greencolor() {
    mkcolor 32 "$1"
}

successcolor() {
    myecho 34 "success: $1"
}

#node command
nodeCommand=$(command -v node);
#shell current path
basePath=`get_base_path`
#project path
projectPath="$basePath/../.."

#创建项目.eslintignore
if ! [ -f "$projectPath/.eslintignore" ];then
    yellowcolor "pre-commit-hooks 创建项目.eslintignore"
    touch "$projectPath/.eslintignore"
fi

#合并package.json
yellowcolor "pre-commit-hooks 合并package.json"
eval "$nodeCommand $basePath/shell/merge-package.js $projectPath/package.json"


#更新eslintrc.js
yellowcolor "pre-commit-hooks 更新eslintrc.js"
eval "$nodeCommand $basePath/shell/update-eslintrc.js $basePath/package.json $basePath/vue-eslintrc.js"

#创建eslint应用
mkdir -p "$basePath/eslint-bin"
cd "$basePath/eslint-bin"
packages=" \
    babel-eslint \
    eslint \
    eslint-codeframe-formatter \
    eslint-config-standard \
    eslint-friendly-formatter \
    eslint-plugin-import \
    eslint-plugin-node \
    eslint-plugin-promise \
    eslint-plugin-standard \
    eslint-plugin-vue \
    vue-eslint-parser";

npmCommand=$(command -v cnpm);
if [ -z "$npmCommand" ];then
    npmCommand=$(command -v npm);
fi
packageInstall="$npmCommand install --save-dev $packages"
echo "$packageInstall"
eval "$packageInstall"

cd "$projectPath"




