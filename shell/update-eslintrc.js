#!/usr/bin/env node
/**
 * Created by rocky on 2018/1/18.
 * 更新本地客户端eslintrc规则
 */
var fs = require('fs');
var url = require('url');
var http = require('http');
var https = require('https');
/**
 * 执行
 * @param packagePath
 * @param replacePath
 */
function run (packagePath, replacePath) {

  if (!packagePath || !replacePath) {
    return 0;
  }
  var downloadUrl = '';
  try {
    downloadUrl = require(packagePath).eslintrcUrl;
    if (!downloadUrl) {
      return 0;
    }
    console.log('正在下载远端eslintrc文件:' + downloadUrl);
  } catch (e) {
    return 0;
  }

  function httpRequest (fileUrl, cb) {
    var urlParse = url.parse(fileUrl);
    var isHttps = urlParse.protocol.replace(':', '').toLowerCase() == 'https';
    var agreement = isHttps ? https : http;
    var timeoutHandle = null;
    var options = {
      host: urlParse.host,
      port: isHttps ? 443 : 80,
      path: urlParse.pathname
    };
    var req = agreement.get(options, function (res) {
      let result = '';
      res.setEncoding('utf8');
      res.on('data', function (data) {
        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
          timeoutHandle = null;
        }
        result += data;
      });
      res.on('end', function () {
        cb(null, result);
      });
    });
    req.on('error', function (e) {
      cb(e);
    });

    timeoutHandle = setTimeout(function () {
      req.abort();
    }, 5000);
  }

//下载新.eslintrc.js
  httpRequest(downloadUrl, function (err, content) {
    if (err) {
      console.log(err);
      console.log('无法成功下载，更新eslintrc失败');
      return;
    }
    if (!content) return;
    try {
      var Module = module.constructor;
      var m = new Module();
      m._compile(content, 'eslintrc-cache.js');
      //生成新eslintrc到指定路径
      fs.writeFile(replacePath, content, function (err) {
        console.log('更新eslintrc成功');
      });
    } catch (e) {
      console.log(e);
      console.log('更新eslintrc失败');
    }
  });
  return 0;
}

module.exports = function(packagePath, replacePath) {
  return run(packagePath, replacePath);
}

if(process.argv[2]) {
  process.exit(run(process.argv[2], process.argv[3]));
}
