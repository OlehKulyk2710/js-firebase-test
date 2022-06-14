import { initializeApp } from 'firebase/app';

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

import { getData, postData } from './js/firebase';
import { signIn } from './js/sign-in';
import { signOutof } from './js/signOut';
import { refs, baseUserData } from './js/base';

refs.userName.textContent = baseUserData.name;

export const usersData = {};
let counterId = 0;
console.log(usersData);

refs.form.addEventListener('submit', onFormSubmit);
refs.btnGet.addEventListener('click', onBtnGetClick);
refs.btnPost.addEventListener('click', onBtnPostClick);
refs.btnDelete.addEventListener('click', onBtnDeleteClick);
refs.btnSignOut.addEventListener('click', onBtnSignOutClick);

function onFormSubmit(event) {
  counterId += 1;
  event.preventDefault();
  const userEmail = event.currentTarget.elements.email.value;
  const userPassword = event.currentTarget.elements.password.value;

  usersData['user' + counterId.toString().padStart(2, 0)] = {
    email: userEmail,
    password: userPassword,
  };

  refs.form.reset();
  signIn(userEmail, userPassword);

  console.log(usersData);
}

function onBtnGetClick() {
  console.log('GET');
  getData();
}
function onBtnPostClick() {
  console.log('POST');
  postData();
}
function onBtnDeleteClick() {
  console.log('DELETE');
}

function onBtnSignOutClick() {
  console.log('SIGNOUT');
  signOutof();
}
