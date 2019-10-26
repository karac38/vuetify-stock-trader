import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD9f1X3SKgiBzjUizxXrYmNV6v2gTnNENs",
    authDomain: "stock-trader-69283.firebaseapp.com",
    databaseURL: "https://stock-trader-69283.firebaseio.com",
    projectId: "stock-trader-69283",
    storageBucket: "stock-trader-69283.appspot.com",
    messagingSenderId: "28385796500",
    appId: "1:28385796500:web:2cd04cdca6729e9876af81"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;