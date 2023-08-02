const mongoose = require("mongoose");

const Pdf = mongoose.model("Pdf");
const User = mongoose.model("User");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dklm81t6j",
  api_key: "141916698999624",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var axios = require("axios");

module.exports.createPost = async (req, res) => {
  //console.log(authRes)

  var story = new Pdf();
  story.fullName = req.body.fullName;
  let dummyTime = Date.now().toString();
  story.time = dummyTime;
  if (req.file) {
    story.pdf = req.file.filename;
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        access_mode: "public",
      });
    story.pdf = uploadResult.secure_url;
  } 
  else story.pdf = req.body.pdf;
  story.imageURLs = req.body.imageURLs || "";
  story.bookContent = req.body.bookContent || "";
  
  story.save(async (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("error in posting story");
    }
  });
};

module.exports.getPost = async (req, res) => {
  
  q = Pdf.find()
    .limit(10);
  q.exec((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("error");
    }
  });

  // res.send(authRes);
};
