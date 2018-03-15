#!/usr/bin/env node
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var axios = require('axios');
var config = {
  //邮件配置
  email: {
    host: 'smtp.exmail.qq.com',
    port: 465,
    user: 'fenghuan@mgzf.com',
    pass: 'Feng1993',
  }
}


smtpTransport = nodemailer.createTransport(smtpTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html) {

  smtpTransport.sendMail({

    from: config.email.user,
    to: recipient,
    subject: subject,
    html: html

  }, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('发送成功')
    }
  });
}

axios.get("http://127.0.0.1:8909/mail").
then(function(res) {
  sendMail('mob-dev@mgzf.com','业务仓库扫描报告', res.data);
});


