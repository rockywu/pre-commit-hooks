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

Usage="
Usage:
    npm run eslint [Model] [Output]

Model   <Necessary>
    scan          简易报告扫描模式，针对被修改的文件）选填，默认模式
    fix           自动修复模式（针对被被修改的文件）
    fix-dry-run   尝试自动修复模式，并生成修复报告（针对被被修改的文件，但不会对文件进行修改，仅支持eslint 4.x以上版本，）
    desc          详细报告扫描模式(针对被被修改的文件，format=codeframe)
    scan-overall  整体项目简易报告扫描模式
    fix-overall   整体项目一键修复模式

Output  <Not Necessary> 输出扫描或处理结果

Miscellaneous  <Not Necessary>
    help          帮助
    eslintrc     查阅扫描仪使用的规则文件 eslintrc.js
"

basePath=`get_base_path`
projectPath="$basePath/../../.."
nodeCommand=$(command -v node);
eslintBin="$basePath/../eslint-bin/node_modules/eslint/bin/eslint.js"
cacheEslintrc="$basePath/../eslint-bin/eslintrc-cache.js"
authEslintrc="$basePath/../vue-eslintrc.js"
filesLog="$basePath/../eslint-bin/files.log"

yellowcolor "生成临时扫描eslintrc"
eval "$nodeCommand $basePath/merge-eslintrc.js $projectPath/.eslintrc.js $authEslintrc $cacheEslintrc"

#执行模式
model="scan";
if ! [ -z "$1" ]; then
  model="$1"
fi
output="no-output";
if ! [ -z "$2" ]; then
    output="$2"
fi

if [ "$model" == "eslintrc" ];then
    cat $cacheEslintrc;
    exit 0;
fi

command="$nodeCommand $eslintBin \
  --ignore-path $projectPath/.eslintignore \
  -c $cacheEslintrc --no-eslintrc --no-inline-config --ext .vue --ext .js";

#执行 代码更新
if ! [ "$model" == "scan" ] \
    && ! [ "$model" == "fix" ] \
    && ! [ "$model" == "fix-dry-run" ] \
    && ! [ "$model" == "desc" ] \
    && ! [ "$model" == "scan-overall" ] \
    && ! [ "$model" == "fix-overall" ] ;then
    yellowcolor "pre-commit-hooks 帮助手册"
    usagecolor "$Usage"
    exit 0;
fi

#添加扫描日志输出位置
if ! [ "$output" == "no-output" ];then
    command=$command" -o $output";
fi

status=0
files="";

if [ "$model" == "scan-overall" ] || [ "$model" == "fix-overall" ]; then
    #整体扫描模式
    if [ "$model" == "fix-overall" ]; then
        command="$command --fix";
    fi
    files="./"
    command="$command $files";
else
    #被改动扫描模式
    git diff --name-only HEAD --diff-filter=AMXTCR > $filesLog;
    while read file;do
        #获取文件扩展名
        file_ext=${file##*.}
        #对有效文件进行扫描
        if [ $file_ext == "js" ] || [ $file_ext == "vue" ]; then
            files="$files $file";
        fi;
    done < $filesLog;
    if [ -z "$files" ]; then
        status=2
    elif [ "$model" == "fix" ]; then
      command="$command --fix $files";
    elif [ "$model" == "desc" ]; then
      command="$command --format=codeframe $files"
    elif [ "$model" == "fix-dry-run" ]; then
      command="$command --fix-dry-run $files";
    else
      command="$command --quiet $files"
    fi
fi
if [ $status -eq 2 ];then
    successcolor "无异常js、vue文件,可安心提交git push..    :)";
    #清楚临时文件
    exit 0;
else
    greencolor "Run Command : \033[33m$command \033[32m";
    eval "$command";
    if ! [ $? -eq 0 ];then
        status=1
    fi
    if [ $status -eq 1 ];then
      errorcolor "存在部分error,请修复后再次git commit.   :(";
      yellowcolor "建议使用“npm run eslint fix”一键修复部分问题, 也可查阅操作手册“npm run eslint help”";
    else
      successcolor "你的代码很标准，可安心提交git push.    :)";
    fi
    exit $status;
fi

