import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { authState } from './auth-state';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firebaseConfig = {
  apiKey: 'AIzaSyB6zHPU06WTT-Wfbp-gtmlww2BBH4EyQx0',
  authDomain: 'filmoteka-project2.firebaseapp.com',
  databaseURL:
    'https://filmoteka-project2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-project2',
  storageBucket: 'filmoteka-project2.appspot.com',
  messagingSenderId: '660298397256',
  appId: '1:660298397256:web:554a4c6f7606a778a94a7d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// To sign up for Firebase with email and password
export async function signUp(email, password) {
  let uid = null;
  const auth = getAuth();
  const displayName = 'Petrovasya';

  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      uid = userCredential.user.uid;
      // ...
    })
    .catch(error => {
      const errorMessage = error.message;
      // ..
    });

  return uid;
}

// To sign in to Firebase with email and password
export async function signIn(email, password) {
  let userData = null;
  const auth = getAuth();

  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in

      userData = userCredential;

      //   console.log('response', userCredential.user.displayName);
      // ...
    })
    .catch(error => {
      console.log(error.message);
    });

  return userData;
}

// To sign out of Firebase
export function signOutOfFirebase() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      Notify.success('Bye, bye.');
      authState();
    })
    .catch(error => {
      // An error happened.
      //   Notify.failure("SignOut doesn't work");
    });
}

// To update user profile in Firebase
export async function updateUserProfile(userName) {
  const auth = getAuth();
  await updateProfile(auth.currentUser, {
    displayName: userName,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch(error => {
      // An error occurred
      // ...
    });
}

// To get user profile in Firebase
export function getUserProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    user.providerData.forEach(profile => {
      console.log('Sign-in provider: ' + profile.providerId);
      console.log('  Provider-specific UID: ' + profile.uid);
      console.log('  Name: ' + profile.displayName);
      console.log('  Email: ' + profile.email);
      console.log('  Photo URL: ' + profile.photoURL);
    });
  }
}

// getUserProfile();
// updateUserProfile();
// signOutOfFirebase();
