// This is simple sample how to serve static website and save form data to file with NodeJS
// Author: programming mentor
// Usage:
// 1. Install dependencies: npm i
// 2. Run: server node server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')));

app.post('/order', (req, res) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jovan78@ethereal.email', // generated ethereal user
      pass: 'VJ3VWHf21F9sjR1Rzk', // generated ethereal password
    },
  });
  console.log(req.body);
  const data = JSON.stringify(req.body);

  let mailOptions = {
    from: '"Fred Foo 👻" romann.kravets@gmail.com', // sender address
    to: "romann.kravets@gmail.com", // list of receivers
    subject: `Замовник: ${req.body.clientName}`,
    html:`<h1>Конаткти замовника</h1>
    <h2>Ім'я: ${req.body.clientName}</h2><br>
    <h2>Телефон: ${req.body.clientPhone}</h2><br>
    <hr/>
    <h1>Послуга</h1>
    <h2>Назва послуги: ${req.body.service}</h2><br>
    <hr/>
    <h1>Навчання</h1>
    <h2>План навчання: ${req.body.plan}</h2><br>
    <hr/>
    <h1>Товар</h1>
    <h2>Назва товару: ${req.body.titleProduct}</h2><br>
    <h2>Ціна товару: ${req.body.priceProduct}</h2><br>
    `
  };

  // send mail with defined transport object
  transporter.sendMail( mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error')
    } else {
      console.log('Email sent: ' + info.response);
      res.send('done')
    }
  });
});

app.post('/order', (req, res) => {
  const fs = require('fs');
  fs.appendFile('./orders.txt', JSON.stringify(req.body) + '\n', function(err) {
    if (err) {
      res.status(500).send('Server error');
      return console.log(err);
    }
    console.log('Data saved: ' + JSON.stringify(req.body));
    res.send('Data saved');
  });
});


console.log(
  'Server is running on',
  process.env.PORT || 3000,
  process.env.IP || '0.0.0.0'
);

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
