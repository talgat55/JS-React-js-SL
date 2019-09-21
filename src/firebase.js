import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyAOyWCbl92_gWFd0O8TlB__eQ6k_H5DDrc",
    authDomain: "react-slack-e890d.firebaseapp.com",
    databaseURL: "https://react-slack-e890d.firebaseio.com",
    projectId: "react-slack-e890d",
    storageBucket: "react-slack-e890d.appspot.com",
    messagingSenderId: "181513825778",
    appId: "1:181513825778:web:45986d9da87750d8640f6b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;