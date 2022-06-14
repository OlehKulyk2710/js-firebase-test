import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAuth, onAuthStateChanged, authStateObserver } from 'firebase/auth';

export function authState() {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      Notify.success('You are SignedIn');
      // ...
    } else {
      // User is signed out
      // ...
      Notify.success('You are SignedOUT');
    }
  });
}
