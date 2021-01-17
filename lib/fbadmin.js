import * as admin from 'firebase-admin';
var serviceAccount = require("/home/sbc/CourseMatch/backend/lib/coursematch.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://coursematch-828fc-default-rtdb.firebaseio.com/'
  });
}
export default admin;