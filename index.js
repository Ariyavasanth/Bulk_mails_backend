const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

appapp.use(cors({
  origin: 'https://your-frontend-domain.com', // ✅ change this to your real frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));


app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/passkey")
  .then(function () {
    console.log("Connected to DB");
  })
  .catch(function () {
    console.log("Failed to connect");
  });
const credentails = mongoose.model("credentails", {}, "bulkmail");

app.post("/sendmail", function (req, res) {
  var msg = req.body.msg;
  var emailList = req.body.email;

  credentails
    .find()
    .then(function (data) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: data[0].toJSON().user,
          pass: data[0].toJSON().pass,
        },
      });
      new Promise(async function (resolve, reject) {
        try {
          for (var i = 0; i < emailList.length; i++) {
            await transporter.sendMail({
              from: "ariyavasanth933@gmail.com",
              to: emailList[i],
              subject: "a message fior bulk mail",
              text: msg,
            });
            console.log("Email sent to:" + emailList[i]);
          }
          resolve("Sucess");
        } catch (error) {
          reject("Fail");
        }
      })
        .then(function () {
          res.send(true);
        })
        .catch(function () {
          res.send(false);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(3000, function (req, res) {
  console.log("server sited.....");
});
