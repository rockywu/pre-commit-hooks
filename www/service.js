/**
 * Created by rocky on 2018/1/15.
 */
let fs = require('fs');
let axios = require('axios');
let express = require('express')
let path = require("path");
let app = express()

//设置静态页面
app.use("/api", express.static(__dirname + '/../scan-rs'));
app.use("/static", express.static(__dirname + '/static'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//首页
app.get('/', function (req, res) {
  let baseUrl = __dirname + '/../scan-rs';
  var result = fs.readdirSync(baseUrl);
  result = (result instanceof Array) ? result : [];
  result = result.filter(function (v) {
    return fs.statSync(baseUrl + '/' + v).isDirectory();
  });
  res.locals.links = result;
  res.render("index.ejs");
});
// 扫描趋势变化
app.get('/report/:name', function (req, res) {
  res.locals.name = req.params.name;
  res.render("reportDate.ejs");
});
// 扫描详情
app.get('/report/:name/:date', function (req, res) {
  res.locals.name = req.params.name;
  res.locals.date = req.params.date;
  res.render("reportInfo.ejs");
});



// 邮件内容--服务端渲染
function formatData(data) {
  var source = {
    error : 0,
    warning : 0,
    all : 0
  };
  data.forEach(function(v, k) {
    if(v === null) return;
    var [type, name, cnt] = v.split(":");
    type = type == "^" ? "error" : type;
    var data = {
      item : name,
      type : type,
      count: parseInt(cnt, 10) || 0
    };
    if(typeof source[type] === 'number') {
      source[type] += data.count;
    }
    source.all += data.count;
  });
  return source;
}
function dayAndMonthAdd0 (number) {
  return (number < 10) ? '0' + number : number;
}
app.get('/mail', function (req, res) {
  var baseUrl = __dirname + '/../scan-rs';
  var result = fs.readdirSync(baseUrl);
  result = (result instanceof Array) ? result : [];
  result = result.filter(function (v) {
    return fs.statSync(baseUrl + '/' + v).isDirectory();
  });
  var data = [];
  var dateData = [];
  result.forEach(function (v, index) {
    let map = {
      name: v,
      errorData: []
    };
    let projectName = v;
    let date = new Date();
    for (let i = 0; i < 3; i++) {
      let scanDate = date.getFullYear().toString() + dayAndMonthAdd0(date.getMonth() + 1) + dayAndMonthAdd0(date.getDate());
      if (index === 0) {
        dateData.push(scanDate);
      }
      let jsonDataStr = '[]';
      let filePath = baseUrl + '/' + projectName + '/' + scanDate + '.json'
      if (fs.existsSync(filePath)) {
        jsonDataStr = fs.readFileSync(filePath)
        let jsonData = (jsonDataStr && JSON.parse(jsonDataStr)) || [];
        var scanData = formatData(jsonData);
        map.errorData.push(scanData.error);
      } else {
        map.errorData.push(null);
      }
      date.setDate(date.getDate() - 1);
    }
    data.push(map);
  });

  res.locals.data = data;
  res.locals.date = dateData;
  res.render("mail.ejs");
});

console.log("http://localhost:8909")

app.listen(8909)

