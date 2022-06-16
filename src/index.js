import './js/base';
import './js/local-storage';
import './js/firebase';

import { refs, defaultUserData } from './js/base';
import { checkUserAuthState } from './js/auth-state';
import { LocStorage } from './js/local-storage';
// import { openModal } from './js/modal';
import { getUserProfile, signOutOfFirebase } from './js/firebase';
import { getData, postData } from './js/firebase-db';

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

export const usersData = {
  name: 'Pupkin',
  age: 100500,
};
// let counterId = 0;

// refs.form.addEventListener('submit', onFormSubmit);

refs.btnGetUserProfile.addEventListener('click', onBtnGetUserProfile);
refs.btnSignOutExtra.addEventListener('click', onBtnSignOutExtra);
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

function onBtnGetUserProfile() {
  console.log('GET userProfile');
  getUserProfile();
}

function onBtnSignOutExtra() {
  signOutOfFirebase();
  console.log('User state');
}

function onBtnGetClick() {
  console.log('GET');
  getData();
}

function onBtnPostClick() {
  console.log('POST');
  postData();
}

// function onBtnDeleteClick() {
//   console.log('DELETE');
// }
