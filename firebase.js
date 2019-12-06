import app from 'firebase/app';
import 'firebase/database';

/*
var firebaseConfig = {
    apiKey: "AIzaSyAOtUcwusxESbhbnpKXpUo1tnWRhSL38oA",
    authDomain: "getschooled-ea6b2.firebaseapp.com",
    databaseURL: "https://getschooled-ea6b2.firebaseio.com",
    projectId: "getschooled-ea6b2",
    storageBucket: "getschooled-ea6b2.appspot.com",
    messagingSenderId: "81250038579",
    appId: "1:81250038579:web:d758e041ac7ac4459e0446"
};
*/
var firebaseConfig = {
    apiKey: "AIzaSyBE5si_VYqEAaVIFx1zX5de282ynxRV5Ik",
    authDomain: "get-schooled-3a0f3.firebaseapp.com",
    databaseURL: "https://get-schooled-3a0f3.firebaseio.com",
    projectId: "get-schooled-3a0f3",
    storageBucket: "get-schooled-3a0f3.appspot.com",
    messagingSenderId: "5757094876",
    appId: "1:5757094876:web:fc337ac772c7f67039dd19",
  };

const firebaseApp = app.initializeApp(firebaseConfig);

export default firebaseApp
