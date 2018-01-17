#!/usr/bin/env bash
#set -x
#创建外层配置来解决自项目无法正常运行已有代码检查本地规范的难处

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

function get_base_path(){
    #bash get current file directory
    local DIR;
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    echo "$DIR";
}

function get_root_path(){
    #bash get current file directory
    local DIR;
    DIR="$( pwd )"
    echo "$DIR";
}

basePath=`get_base_path`
rootPath=`get_root_path`

if [ -z $HOME ]; then
  errorcolor "本地\$HOME不存在,请先设置";
  exit 1;
fi

repository="$HOME/.pre-commit-hooks-repository"

rm -rf $repository;

mkdir -p $repository

cp "$basePath/../package.json" "$repository/package.json";

cd $repository;

greencolor "pre-commit-hooks外置核心扫描库包, $repository"
#判断是否存在cnpm
echo $packages;
command -v cnpm >/dev/null 2>&1
if [ $? -eq 0 ];then
  cnpm install --save-dev
else
  npm install --save-dev
fi




