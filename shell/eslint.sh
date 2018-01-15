#!/usr/bin/env bash
status=0
git diff --name-only HEAD --diff-filter=AMXTCR > /tmp/git-diff-log.txt;
while read file;do
    #获取文件扩展名
    file_ext=${file##*.}
    #对有效文件进行扫描
    if [ $file_ext == "js" ] || [ $file_ext == "vue" ]; then
        node ./node_modules/eslint/bin/eslint.js --no-inline-config ${file}
        if ! [ $? -eq 0 ];then
            status=1
        fi
    fi
done < /tmp/git-diff-log.txt;
exit $status;
