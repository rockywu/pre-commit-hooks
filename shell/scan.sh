#!/usr/bin/env bash
root=./scan
log=./scan-rs
tmp=/tmp/filelist.log

function outputJson() {
    cat "$1" | grep -v ".vue$" | grep -v ".js$" | grep -v "^$" | awk -F " " '{print $2":"$NF}' | grep -v ")$" |
     grep -v "\." | grep -v ';' | awk '{a[$1]++}END{for(j in a) print j, a[j]}' |\
     sort -rn -k2 | awk -F " " 'BEGIN{print "["}{print "\""$1":"$2"\","}END{print "null]"}' > $2;
}

function getProblems() {
    tail -n 2 "$1" > $2
}

scans=(
    "AM src reg.js" \
    "Minisite src tasks" \
    "MobBS src" \
    "mogoroom-renterembed-h5 src" \
    "Partner-fe src" \
    "PartnerH5 source" \
    "TouchWeb src" \
    "tp-rebuild src"
);

function dev() {
    for ((i=0; i<${#scans[@]};i++)); do
        arr=(${scans[i]})
        name=${arr[0]}
        out=$log/$name
        files=""
        if ! [ -z ${arr[1]} ];then
            files=$files" "$root/$name/${arr[1]};
        fi
        if ! [ -z ${arr[2]} ];then
            files=$files" "$root/$name/${arr[2]};
        fi
        list="";
        find $files -name "*.js" -o -name "*.vue" > $tmp
        while read file;do
            list=$list" "$file
            echo $file
            node ./node_modules/eslint/bin/eslint.js --no-color \
            --ignore-path .eslintignore \
            -c vue-eslint.js --no-eslintrc --ext .js --ext .vue $file >> test.log
        done < $tmp
        echo $list;
    done

}

function product() {
    for ((i=0; i<${#scans[@]};i++)); do
        arr=(${scans[i]})
        name=${arr[0]}
        out=$log/$name
        files=""
        if ! [ -z ${arr[1]} ];then
            files=$files" "$root/$name/${arr[1]};
        fi
        if ! [ -z ${arr[2]} ];then
            files=$files" "$root/$name/${arr[2]};
        fi
        command="node ./node_modules/eslint/bin/eslint.js --no-color \
            --ignore-path .eslintignore \
            -c vue-eslintrc.js --no-eslintrc --ext .js --ext .vue \
            -o $out $files"
        echo $command;
        eval $command;
        outputJson "$out" "$out.json"
        getProblems "$out" "$out.txt"
    done
}

product

#dev

