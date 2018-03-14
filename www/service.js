/**
 * Created by rocky on 2018/1/15.
 */
let express = require('express')
let path = require("path");
let app = express()

//设置静态页面
app.use("/api", express.static(__dirname + '/../scan-rs'));
app.use("/static", express.static(__dirname + '/static'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let links = [
  'AM',
  'Minisite',
  'MobBS',
  'mogoroom-renterembed-h5',
  'Partner-fe',
  'PartnerH5',
  'school-pc',
  'school-wechat',
  'TouchWeb',
  'tp-rebuild',
  'vic-gov-pc',
  'vic-renter-embed',
];

//首页
app.get('/', function (req, res) {
  res.locals.links = links;
  res.render("index.ejs");
});

app.get('/report/:name', function (req, res) {
  res.locals.name = req.params.name;
  res.render("reportDate.ejs");
});
app.get('/report/:name/:date', function (req, res) {
  res.locals.name = req.params.name;
  res.locals.date = req.params.date;
  res.render("reportInfo.ejs");
});
console.log("http://localhost:8909")

app.listen(8909)

