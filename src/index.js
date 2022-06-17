import './js/base';
import './js/local-storage';
import './js/firebase';

import { refs, defaultUserData } from './js/base';
import { checkUserAuthState } from './js/auth-state';
import { LocStorage } from './js/local-storage';
// import { openModal } from './js/modal';
import { getUserProfile, signOutOfFirebase } from './js/firebase';
import {
  getDatafromFirebase,
  postDataToFirebase,
  clearDtbFirebase,
} from './js/firebase-db';

// alert(
//   'Hi there! After you see the contents of the web page, please open DevTools/Console.'
// );

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
refs.btnClear.addEventListener('click', onBtnClearClick);

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
  getDatafromFirebase();
}

function onBtnPostClick() {
  console.log('POST');
  postDataToFirebase();
}

function onBtnClearClick() {
  console.log('Clear');
  clearDtbFirebase();
}
