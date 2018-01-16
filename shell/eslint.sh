#!/usr/bin/env bash
#set -x

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

tmpLog=/tmp/git-diff-log.txt;
model="no-model"
if ! [ -z "$1" ]; then
  model="$1"
fi

baseCommand="node ./node_modules/eslint/bin/eslint.js -c .eslintrc.js --no-eslintrc --no-inline-config --ext .vue --ext .js";

status=0
git diff --name-only HEAD --diff-filter=AMXTCR > $tmpLog;
while read file;do
    #获取文件扩展名
    file_ext=${file##*.}
    #对有效文件进行扫描
    if [ $file_ext == "js" ] || [ $file_ext == "vue" ]; then
        if [ $model == "fix" ]; then
          command=$baseCommand" --fix $file";
        elif [ $model == "desc" ]; then
          command="cat $file | $baseCommand --format=codeframe --stdin"
        elif [ $model == "fix-dry-run" ]; then
          command="cat $file | $baseCommand --fix-dry-run --stdin";
        else
          command="cat $file | $baseCommand --stdin"
        fi
        greencolor "Run Command : \033[33m$command \033[32m";
        eval "$command";
        if ! [ $? -eq 0 ];then
            status=1
        fi
    fi
done < $tmpLog;
if [ $status -eq 1 ];then
  errorcolor "存在部分error,请修复后再次git commit.   :(";
else
  successcolor "你的代码很标准，可安心提交git push.    :)";
fi
exit $status;
