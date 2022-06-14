import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { authState } from './auth-state';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function signIn(email, password) {
  const auth = getAuth();
  console.log(auth);
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user.accessToken;
      console.log('user', user);
      authState();
      //   Notify.success('You are SignedIn');

      // ...
    })
    .catch(error => {
      Notify.failure('Wrong email or password. Try again.');
    });
}
