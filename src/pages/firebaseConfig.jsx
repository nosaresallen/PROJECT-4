import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhIFizygTeX48zGD0Db57Wd8su795i7Bk",
    authDomain: "employeesdashboard.firebaseapp.com",
    projectId: "employeesdashboard",
    storageBucket: "employeesdashboard.appspot.com",
    messagingSenderId: "352831430050",
    appId: "1:352831430050:web:66eb4665255cede585e6fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;