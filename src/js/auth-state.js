// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { getAuth, onAuthStateChanged, authStateObserver } from 'firebase/auth';

// export function authState() {
//   const auth = getAuth();
//   onAuthStateChanged(auth, user => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       console.log(uid);
//       Notify.success('You are SignedIn');
//       // ...
//     } else {
//       // User is signed out
//       // ...
//       Notify.success('You are SignedOUT');
//     }
//   });
// }

// -----------------------

import { refs, defaultUserData } from './base';
import { LocStorage } from './local-storage';
import { openModal } from './modal';
import { signOutOfFirebase } from './firebase';

export function checkUserAuthState() {
  const userData = LocStorage.getItem();
  // console.log('userData from LC:', userData);
  if (!userData || !userData.name) {
    refs.userName.textContent = defaultUserData.name;
    refs.btnSignOut.classList.add('visually-hidden');
    refs.authLine.classList.remove('visually-hidden');
    refs.authLine.addEventListener('click', onAuthLineClick);
    refs.btnSignOut.removeEventListener('click', onBtnSignOutClick);
  } else {
    refs.userName.textContent = userData.name;
    refs.authLine.classList.add('visually-hidden');
    refs.btnSignOut.classList.remove('visually-hidden');
    refs.btnSignOut.addEventListener('click', onBtnSignOutClick);
    refs.authLine.removeEventListener('click', onAuthLineClick);
  }
}

function onAuthLineClick(event) {
  const element = event.target.nodeName;
  if (element !== 'BUTTON') {
    return;
  }
  const elementAtr = event.target.attributes[1].name;
  openModal(elementAtr);

  // console.log(elementAtr);
  // console.log(event.target.attributes);
}

function onBtnSignOutClick() {
  // console.log('SIGNOUT');
  signOutOfFirebase();
  LocStorage.removeItem();
  checkUserAuthState();
  // signOutof();
}
