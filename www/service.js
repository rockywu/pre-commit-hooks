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

// let links = [
//   'AM',
//   'Minisite',
//   'MobBS',
//   'mogoroom-renterembed-h5',
//   'Partner-fe',
//   'PartnerH5',
//   'school-pc',
//   'school-wechat',
//   'TouchWeb',
//   'tp-rebuild',
//   'vic-gov-pc',
//   'vic-renter-embed',
// ];

//首页
app.get('/', function (req, res) {
  var result = fs.readdirSync(__dirname + '/../scan-rs');
  result = (result instanceof Array) ? result : [];
  result = result.filter(function (v) {
    return v.match(/^[^.]*$/);
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
    return v.match(/^[^.]*$/);
  });
  var data = [];
  result.forEach(function (v) {
    let map = {
      name: v
    };
    let projectName = v;
    let date = new Date();
    let todayScanDate = date.getFullYear() + dayAndMonthAdd0(date.getMonth() + 1) + dayAndMonthAdd0(date.getDate());
    let jsonDataStr = fs.readFileSync(baseUrl + '/' + projectName + '/' + todayScanDate + '.json')
    let jsonData = (jsonDataStr && JSON.parse(jsonDataStr)) || [];
    var todayData = formatData(jsonData);
    map.today = todayData.error;

    // date.setDate(date.getDate() - 1);
    // let yesterdayScanDate = date.getFullYear() + dayAndMonthAdd0(date.getMonth() + 1) + dayAndMonthAdd0(date.getDate());
    // let jsonDataStr2 = fs.readFileSync(baseUrl + '/' + projectName + '/' + yesterdayScanDate + '.json');
    // let jsonData2 = (jsonDataStr2 && JSON.parse(jsonDataStr2)) || [];
    // var yesterdayData = formatData(jsonData2);
    // map.yesterday = yesterdayData.error;
    data.push(map);
  });

  res.locals.data = data;
  console.log(data);
  res.render("mail.ejs");
});

console.log("http://localhost:8909")

app.listen(8909)

