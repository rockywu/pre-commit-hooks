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

#合并package.json
rs=$(eval "$nodeCommand $basePath/shell/merge-package.js $projectPath/package.json");
yellowcolor $rs;

#更新eslintrc.js
eval "$nodeCommand $basePath/shell/update-eslintrc.js $basePath/package.json $basePath/vue-eslintrc.js"





