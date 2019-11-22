import app from 'firebase/app';
import 'firebase/database';


var firebaseConfig = {
    apiKey: "AIzaSyAOtUcwusxESbhbnpKXpUo1tnWRhSL38oA",
    authDomain: "getschooled-ea6b2.firebaseapp.com",
    databaseURL: "https://getschooled-ea6b2.firebaseio.com",
    projectId: "getschooled-ea6b2",
    storageBucket: "getschooled-ea6b2.appspot.com",
    messagingSenderId: "81250038579",
    appId: "1:81250038579:web:d758e041ac7ac4459e0446"
};

const firebaseApp = app.initializeApp(firebaseConfig);

export default firebaseApp