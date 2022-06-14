import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAuth, signOut } from 'firebase/auth';
import { authState } from './auth-state';

export function signOutof() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      authState();
    })
    .catch(error => {
      // An error happened.
      Notify.failure("SignOut doesn't work");
    });
}
