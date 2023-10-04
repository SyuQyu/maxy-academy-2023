import app from './firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth(app());

const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User is registered in.');
        return {
            email: user.email
        };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
            error: errorMessage
        };
    }
};

const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User is signed in.');
        return {
            email: user.email
        };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return {
            error: errorMessage
        };
    }
};

const logout = async () => {
    try {
        await auth.signOut();
        console.log('User signed out.');
        return true;
    } catch (error) {
        console.log('Error signing out:', error);
        throw new Error('Error signing out');
        return false;
    }
};

const checkUserLoggedIn = async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is signed in.');
                resolve({
                    uid: user.uid,
                    email: user.email,
                });
            } else {
                console.log('User is not signed in.');
                resolve(null);
            }
        });
    });
};

export { signIn, signUp, logout, checkUserLoggedIn };
