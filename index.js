const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const app = express();

app.use(cors({ origin: "https://bulkmailfrontend.vercel.app" }));

//middle ware for post and put
app.use(express.json());

// /connected to db
mongoose
  .connect(
    "mongodb+srv://ariya:123@cluster0.cwaattt.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db connected sucessfully");
  })
  .catch(() => {
    console.log("db not connected");
  });

const credentialSchema = new mongoose.Schema({
  user: String,
  pass: String,
});

const Credential = mongoose.model("Credential", credentialSchema, "bulkmail");

//cret a model to for connected to collection

app.post("/sendmail", async function (req, res) {
  console.log(req.body);
  var msg = req.body.msg;
  var emailList = req.body.email;

  Credential.find()
    .then((data) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          // Replace these with your real Gmail credentials or use .env for safety
          user: data[0].user,
          pass: data[0].pass,
        },
      });
      console.log("User:", data[0].user);
      console.log("Pass:", data[0].pass);

      new Promise(async function (resolve, reject) {
        try {
          for (let i = 0; i < emailList.length; i++) {
            await transporter.sendMail({
              from: "ariyavasanth933@gmail.com",
              to: emailList[i],
              subject: "A message from Bulk Mail App",
              text: msg,
            });
            console.log("Email sent to: " + emailList[i]);
          }
          resolve("Sucess");
        } catch (error) {
          console.error("Failed to send some/all emails", error);
          reject("failed");
        }
      })
        .then(() => {
          res.send(true);
        })
        .catch(() => {
          res.send(false);
        });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

app.listen(3000, function () {
  console.log("Server started on http://localhost:3000");
});
