
const pdf = require('pdf-parse');
//import admin from '../../lib/fbadmin.js'
import { v4 as uuidv4 } from 'uuid';
var fs = require('fs');
import formidable from 'formidable';
var nodemailer = require('nodemailer');
//406BD341E0C52EFFF88EAE923367374EB9299F141EAE59271F710D15B7DC4DFE2AC1CBB0BA067F4362C144F653413C44

import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyDr1C2Ia5tigss8CC4dCzu4z7iZhV_QIdY",
  authDomain: "coursematch-828fc.firebaseapp.com",
  databaseURL: "https://coursematch-828fc-default-rtdb.firebaseio.com/",
  projectId: "coursematch-828fc",
  storageBucket: "coursematch-828fc.appspot.com",
  messagingSenderId: "968938856297",
  appId: "1:968938856297:web:8bef72d70dcf837348a7f8",
  measurementId: "G-M48V0YJQ81"
};
if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}
let database = firebase.database()


export const config = {
  api: {
    bodyParser: false,
  },
};


export default (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    var oldpath = files.userfile.path;
    var newpath = '/tmp/dsfkjsfkjhs.pdf';
    console.log(newpath)
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      let dataBuffer = fs.readFileSync(newpath);
      pdf(dataBuffer).then(function(data) {
        console.log(findCourses(data.text));
        var token = uuidv4();
        database.ref(token).set({courses: findCourses(data.text), name: findName(data.text) });
        /*
        fetch('https://api.elasticemail.com/v2/email/send', {
        method: 'post',
        headers: {
        apikey: '71BD8643B83ADA821DEE53B73315F9A703FD25E6488EEBAA8292B1D1FDD3DA3E8845EFA41810F5FEFB887EFCC9E49D8C',
        text: 'yo what is good homie',
        from: 'northhack2020@gmail.com',
        to: [fields.email],
        expires: 'never',
        subject: 'Welcome!'
      }
    }).then(function(response) {
    return response.json();
  }).then(function(data) {
  console.log(data);
});*/
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'northhack2020@gmail.com',
          pass: 'MarkZuck03'
        }
      });

    var mailOptions = {
      from: 'northhack2020@gmail.com',
      to: fields.email,
      subject: 'Your Course Match Token',
      text: 'Use this link to signup for the discord server: https://discord.gg/a3TjHTsxyk \n Message this \'>verify ' +token + '\' in the channel called verification to have access to your course channels'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

res.write('File uploaded and moved!');
res.end();
});
});
console.log(err, fields, files);
});
}

function findName(fileText){
  const linesArr = fileText.split('\n');    // creates array that holds each line of fileText in each index
  return linesArr[6]
}

function findCourses(fileText) {
  const linesArr = fileText.split('\n');    // creates array that holds each line of fileText in each index
  const linesArrLen = linesArr.length;
  let courseList = [];
  let courseListIndex = linesArr.indexOf("Course List");    // finds where "Course List" is in array

  let lineContainsCourseInfo = true;

  for (let i = (courseListIndex + 1); i < linesArrLen; i++) {
    if (lineContainsCourseInfo) {
      courseList.push(linesArr[i]);
      lineContainsCourseInfo = false;
    } else {
      lineContainsCourseInfo = true;
    }
  }

  return courseList;
}