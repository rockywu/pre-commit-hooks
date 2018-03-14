
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var axios = require('axios');
var config = {
  //邮件配置
  email: {
    service: 'smtp.exmail.qq.com',
    port: 465,
    user: 'fenghuan@mgzf.com',
    pass: 'Feng1993',
  }
}


smtpTransport = nodemailer.createTransport(smtpTransport({
  host: config.email.service,
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
    }
    console.log('发送成功')
  });
}

axios.get("http://localhost:8909/mail").
then(function(res) {
  sendMail('940083334@qq.com','这是测试邮件', res.data);
});


