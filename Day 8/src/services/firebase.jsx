import { initializeApp } from 'firebase/app';

function firebaseAuth() {
    const firebaseConfig = {
        apiKey: "AIzaSyBMjeKr1DR0VJzqfSMifuWJlgMWxQ-vAMM",
        authDomain: "f7-auth-bae9c.firebaseapp.com",
        projectId: "f7-auth-bae9c",
        storageBucket: "f7-auth-bae9c.appspot.com",
        messagingSenderId: "274364461243",
        appId: "1:274364461243:web:f60011508cc898f714399e"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return app;
}
export default firebaseAuth;
