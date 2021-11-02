// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import {User} from "../data/user";

function toUserFromFirebaseUser(firebaseUser: FirebaseUser | null): User | null {
    if (firebaseUser) {
        return {
            email: firebaseUser.email
        };
    } else {
        return null;
    }
}

export default class AuthService {
    static firebaseConfig = {
        apiKey: "AIzaSyDAiQy30Hq2hTIIGQ15OGCS3kdXZdxGOs8",
        authDomain: "ricky-firebase-project.firebaseapp.com",
        projectId: "ricky-firebase-project",
        storageBucket: "ricky-firebase-project.appspot.com",
        messagingSenderId: "972382395103",
        appId: "1:972382395103:web:3ea299ee334d5b64c0e76a",
        measurementId: "G-XG1TQZDVYS"
    };

    static user: User | null = null;

    static init() {
        // Initialize Firebase
        const app = initializeApp(AuthService.firebaseConfig);
        const analytics = getAnalytics(app);

        AuthService.onAuthStateChanged((user: User | null) => {
            AuthService.user = user;
            console.log("onAuthStateChanged", user);
        });
    }

    static getAccessToken() {
        console.log(getAuth().currentUser);
        if (!getAuth().currentUser) {
            throw new Error("No active session");
        }
        return getAuth().currentUser!.getIdToken();
    }

    static onAuthStateChanged(callback: (user: User | null) => void) {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            callback(toUserFromFirebaseUser(firebaseUser));
        });
    }

    static signInWithEmailAndPassword(email: string, password: string, callback: (isSuccess: boolean) => void) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("login success", userCredential);
                // Signed in
                const user = userCredential.user;
                callback(true);
                // ...
            })
            .catch((error) => {
                console.error("login failed", error);
                callback(false);
            });
    }

    static signInWithGoogle(callback: (isSuccess: boolean) => void) {
        const provider = new GoogleAuthProvider();
        AuthService.signInWithPopup(provider, callback);
    }

    static signInWithFacebook(callback: (isSuccess: boolean) => void) {
        const provider = new FacebookAuthProvider();
        AuthService.signInWithPopup(provider, callback);
    }

    static signInWithPopup(provider: any, callback: (isSuccess: boolean) => void) {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                callback(true);
            }).catch((error) => {
            console.error(error);
            callback(false);
        });
    }

    static signOut(callback: () => void) {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            callback();
        }).catch((error) => {
            // An error happened.
            console.error(error);
            AuthService.user = null;
            callback();
        });
    }
}