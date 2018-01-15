#!/usr/bin/env bash
#set -x
tmpLog=/tmp/git-diff-log.txt;
model="no-model"
if ! [ -z "$1" ]; then
  model="$1"
fi

status=0
git diff --name-only HEAD --diff-filter=AMXTCR > $tmpLog;
while read file;do
    #获取文件扩展名
    file_ext=${file##*.}
    #对有效文件进行扫描
    if [ $file_ext == "js" ] || [ $file_ext == "vue" ]; then
        if [ $model == "fix" ]; then
          node ./node_modules/eslint/bin/eslint.js -c .eslintrc.js --no-eslintrc --fix --no-inline-config ${file}
        elif [ $model == "desc" ]; then
          node ./node_modules/eslint/bin/eslint.js -c .eslintrc.js --no-eslintrc --format=codeframe --no-inline-config ${file}
        elif [ $model == "fix-dry-run" ]; then
          node ./node_modules/eslint/bin/eslint.js -c .eslintrc.js --no-eslintrc --fix-dry-run --no-inline-config ${file}
        else
          node ./node_modules/eslint/bin/eslint.js -c .eslintrc.js --no-eslintrc --no-inline-config ${file}
        fi
        if ! [ $? -eq 0 ];then
            status=1
        fi
    fi
done < $tmpLog;
exit $status;
