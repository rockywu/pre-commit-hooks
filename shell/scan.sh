#!/usr/bin/env bash
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

filePath=`get_base_path`
rootPath="$filePath/.."
scanPath="$rootPath/scan"
shellPath="$rootPath/shell"
scanRsPath="$rootPath/scan-rs"
cacheVueEslintrcPath="$rootPath/eslint-bin/cacheVueEslintrc.js"

yellowcolor "创建eslint应用"
mkdir -p "$rootPath/eslint-bin"
cd "$rootPath/eslint-bin"

packageJson="{ \
  \"devDependencies\": {}, \
  \"dependencies\": {} \
}";
echo "$packageJson" > "$rootPath/eslint-bin/package.json"
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
    eslint-plugin-vue@~4.2.2 \
    vue-eslint-parser";

npmCommand=$(command -v cnpm);
if [ -z "$npmCommand" ];then
    npmCommand="npm"
else
    npmCommand="cnpm"
fi
packageInstall="$npmCommand install --save-dev $packages"
echo "$packageInstall"
eval "$packageInstall"

cd "$rootPath"

yellowcolor "clone所有需要扫描的仓库代码"
gitUrls[0]="git@git.mogo.com:tpfe/AM.git"
gitUrls[1]="git@git.mogo.com:Frontend/Minisite.git"
gitUrls[2]="git@git.mogo.com:Frontend/MobBS.git"
gitUrls[3]="git@git.mogo.com:Frontend/mogoroom-renterembed-h5.git"
gitUrls[4]="git@git.mogo.com:Frontend/Partner-fe.git"
gitUrls[5]="git@git.mogo.com:Frontend/PartnerH5.git"
gitUrls[6]="git@git.mogo.com:Frontend/school-pc.git"
gitUrls[7]="git@git.mogo.com:Frontend/school-wechat.git"
gitUrls[8]="git@git.mogo.com:Frontend/TouchWeb.git"
gitUrls[9]="git@git.mogo.com:Frontend/tp-rebuild.git"
gitUrls[10]="git@git.mogo.com:Frontend/vic-gov-pc.git"
gitUrls[11]="git@git.mogo.com:Frontend/vic-renter-embed.git"
gitUrls[12]="git@git.mogo.com:Frontend/Mob-fe.git"
cd "$scanPath"
for i in ${gitUrls[@]};do
	name=${i##*/}
	dirName=${name%%.git}
	if ! [ -d  "$scanPath/$dirName" ];then
	    git clone $i;
    fi
done;

yellowcolor "更新所有需要扫描的仓库代码"
ls "${scanPath}" | awk '{print $1}' | while read dir;do
    yellowcolor "正在更新仓库:${dir}"
    cd "$scanPath/$dir"
    git reset --hard
#    git checkout master
    git pull --rebase origin master
done;

yellowcolor "更新vue-eslint规范"
node "$shellPath/update-eslintrc.js" "$rootPath/package.json" "$cacheVueEslintrcPath"


yellowcolor "更新后进行代码扫描"

function outputJson() {
    cat "$1" | grep -v ".vue$" | grep -v ".js$" | grep -v "^$" | awk -F " " '{print $2":"$NF}' | grep -v ")$" |
     grep -v "\." | grep -v ';' | awk '{a[$1]++}END{for(j in a) print j, a[j]}' |\
     sort -rn -k2 | awk -F " " 'BEGIN{print "["}{print "\""$1":"$2"\","}END{print "null]"}' > $2;
}

function getProblems() {
    tail -n 2 "$1" > $2
}

#代码扫描项目
ls "${scanPath}" | awk '{print $1}' | while read dir;do
    path="$scanPath/$dir"
    yellowcolor "正在扫描现有仓库：${dir}, 路径：${path}"
    outPath="$scanRsPath/$dir"
    baseLog="$outPath.log"
    dateTime=$(date +%Y%m%d)
    mkdir -p "$outPath"
    filePath="$outPath/$dateTime"
    if ! [ -f "$path/.eslintignore" ];then
        greencolor "项目自带过滤文件不存在:${dir}, 自动创建:${path}/.eslintignore"
        touch "${path}/.eslintignore"
    fi
    node "$shellPath/merge-eslintrc.js" "$path" "$cacheVueEslintrcPath" "$rootPath/eslint-bin/.cache.eslintrc.js"
    command="node "$rootPath/eslint-bin/node_modules/eslint/bin/eslint.js" --no-color --ignore-path "$path/.eslintignore" -c "$rootPath/eslint-bin/.cache.eslintrc.js" --no-eslintrc --quiet --ext .js --ext .vue -o "$baseLog" "$path""
    usagecolor "$command"
    `$command`
    greencolor "完成eslintrc扫描：${dir}"

    greencolor "输出eslintrc扫描JSON明细结果：${filePath}.json"
    outputJson "$baseLog" "$filePath.json"

    greencolor "输出eslintrc扫描总数结果：${dir}.txt"
    getProblems "$baseLog" "$filePath.txt"

    hasHooks=$(cat "$path/package.json" | grep "pre-commit-hooks" | wc -l | awk '{print $1}')

    echo "{\"cnt\":"$hasHooks"}" > "$filePath.cnt.json"

    successcolor "仓库扫描完成：${dir}"
done;


