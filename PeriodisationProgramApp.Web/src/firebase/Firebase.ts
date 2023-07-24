import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAdditionalUserInfo,
  updateProfile,
  confirmPasswordReset,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FirebaseError, initializeApp } from "firebase/app";
import UserService from "../serverInteraction/services/UserService";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6fihlS3Lm_smYVm2o2_ST5eeZLCykF_M",
  authDomain: "periodisationprogramapp.firebaseapp.com",
  projectId: "periodisationprogramapp",
  storageBucket: "periodisationprogramapp.appspot.com",
  messagingSenderId: "937655608026",
  appId: "1:937655608026:web:5dac3c3f7db5c4a9363be3",
  measurementId: "G-GXPDPJVYB2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    if (user !== null && user !== undefined) {
      const info = getAdditionalUserInfo(res);

      if (info?.isNewUser) {
        UserService.addThisUser();
      }
    }
  } catch (err) {
    console.error(err);

    if (err instanceof FirebaseError) {
      return err;
    }

    return new FirebaseError("unknown", "Unknown error");
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);

    if (err instanceof FirebaseError) {
      return err;
    }

    return new FirebaseError("unknown", "Unknown error");
  }
};

const registerWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    if (user !== null && user !== undefined) {
      UserService.addThisUser();
      await updateProfile(user, { displayName: username.trim() });
    }
  } catch (err) {
    console.error(err);

    if (err instanceof FirebaseError) {
      return err;
    }

    return new FirebaseError("unknown", "Unknown error");
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);

    if (err instanceof FirebaseError) {
      return err;
    }

    return new FirebaseError("unknown", "Unknown error");
  }
};

const passwordReset = async (code: string, newPassword: string) => {
  try {
    await confirmPasswordReset(auth, code, newPassword);
  } catch (err) {
    console.error(err);

    if (err instanceof FirebaseError) {
      return err;
    }

    return new FirebaseError("unknown", "Unknown error");
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  passwordReset,
  logout,
};
