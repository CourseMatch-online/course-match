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
  firebase.initializeApp(firebaseConfig)
  let database = firebase.database()

export default (req, res) => {
    if (req.method === 'POST') {
        
      } else {
        // Handle any other HTTP method
      }
  }