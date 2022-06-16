import './js/base';
import './js/local-storage';
import './js/firebase-init';
import './js/firebase';

import { getData, postData } from './js/firebase-init';
import { refs, defaultUserData } from './js/base';
import { checkUserAuthState } from './js/auth-state';
import { LocStorage } from './js/local-storage';
// import { openModal } from './js/modal';
import { getUserProfile, signOutOfFirebase } from './js/firebase';

checkUserAuthState();

const attempt = {
  name: 'Poppy',
  email: 'test@ukr.net',
  accessId: '',
};

// LocStorage.setItem(attempt);
// checkUserAuthState();

// LocStorage.removeItem();
// checkUserAuthState();

// refs.authLine.addEventListener('click', onAuthLineClick);

export const usersData = {};
// let counterId = 0;

// refs.form.addEventListener('submit', onFormSubmit);
refs.btnGet.addEventListener('click', onBtnGetClick);
refs.btnPost.addEventListener('click', onBtnPostClick);
// refs.btnDelete.addEventListener('click', onBtnDeleteClick);
// refs.btnSignOut.addEventListener('click', onBtnSignOutClick);

// function onFormSubmit(event) {
//   counterId += 1;
//   event.preventDefault();
//   const userEmail = event.currentTarget.elements.email.value;
//   const userPassword = event.currentTarget.elements.password.value;

//   usersData['user' + counterId.toString().padStart(2, 0)] = {
//     email: userEmail,
//     password: userPassword,
//   };

//   refs.form.reset();
//   signIn(userEmail, userPassword);

//   console.log(usersData);
// }

function onBtnGetClick() {
  console.log('GET userProfile');
  getUserProfile();
  // getData();
}
function onBtnPostClick() {
  signOutOfFirebase();
  console.log('User state');
  // postData();
}
// function onBtnDeleteClick() {
//   console.log('DELETE');
// }
