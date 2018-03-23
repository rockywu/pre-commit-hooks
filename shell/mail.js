#!/usr/bin/env node
var axios = require('axios');

axios.get("http://127.0.0.1:8909/mail").
then(function(res) {
  axios.post("http://192.168.60.253:8908/sendMail", {
    recipient: 'mob-dev@mgzf.com',
    // recipient: 'fenghuan@mgzf.com',
    subject: '业务仓库扫描报告',
    html: res.data
  }).
  then(function(res) {
    console.log(res.data.message);
  }).
  catch(function(err){
    console.log(err);
  });
});


