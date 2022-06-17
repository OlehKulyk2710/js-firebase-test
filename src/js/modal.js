import { refs } from './base';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { signUp, signIn, updateUserProfile } from './firebase';
import { LocStorage } from './local-storage';
import { checkUserAuthState } from './auth-state';
import { createUserDtbName } from './firebase-db';

// let counterId = 0;
let isRegisteredUser = '';

export function openModal(elementAtr) {
  if (elementAtr === 'js-signin') {
    refs.titleModal.textContent = 'Authorization Form';
    refs.formUserName.classList.add('visually-hidden');
    isRegisteredUser = true;
    // console.log('SIGN IN');
  } else if (elementAtr === 'js-signup') {
    refs.titleModal.textContent = 'Registration Form';
    refs.formUserName.classList.remove('visually-hidden');
    isRegisteredUser = false;
    // console.log('SIGN UP');
  } else {
    return;
  }
  refs.backdropModal.classList.remove('visually-hidden');
  refs.btnModalClose.addEventListener('click', onModalBtnClose);
  refs.form.addEventListener('submit', onFormSubmit);
}

function onModalBtnClose() {
  refs.form.reset();
  refs.backdropModal.classList.add('visually-hidden');
  refs.btnModalClose.removeEventListener('click', onModalBtnClose);
}

async function onFormSubmit(event) {
  event.preventDefault();

  const userName = event.currentTarget.elements.username.value.trim();
  const userEmail = event.currentTarget.elements.email.value.trim();
  const userPassword = event.currentTarget.elements.password.value.trim();

  if ((!isRegisteredUser && !userName) || !userEmail || !userPassword) {
    Notify.failure('Wrong email or password. Try again.');
    refs.form.reset();
    return;
  }

  if (isRegisteredUser) {
    const responseSignIn = await signIn(userEmail, userPassword);
    if (!responseSignIn) {
      Notify.failure('Wrong email or password. Try again.');
      return;
    }
    Notify.success('You are signed in');
    const currentUserData = {
      name: responseSignIn.displayName,
      email: responseSignIn.email,
      uid: responseSignIn.uid,
      dbName: '',
    };
    const currentUserDtbName = createUserDtbName(currentUserData);

    LocStorage.setItem(currentUserDtbName);
    checkUserAuthState();
    refs.btnGetUserProfile.disabled = false;
  } else {
    const responseSignUp = await signUp(userEmail, userPassword);
    if (!responseSignUp) {
      Notify.failure('Wrong registration.Try again.');
      return;
    }
    await updateUserProfile(userName);
    Notify.success(
      `Congratulation! New user ${userName} has been just registered.`
    );

    const currentUserData = {
      name: userName,
      email: responseSignUp.email,
      uid: responseSignUp.uid,
      dbName: '',
    };
    const currentUserDtbName = createUserDtbName(currentUserData);

    LocStorage.setItem(currentUserDtbName);
    checkUserAuthState();
    refs.btnGetUserProfile.disabled = false;
  }

  refs.form.reset();
  refs.backdropModal.classList.add('visually-hidden');

  // console.log(userEmail, userPassword);

  isRegisteredUser = '';
  refs.btnModalClose.removeEventListener('click', onModalBtnClose);
  refs.form.removeEventListener('submit', onFormSubmit);
}
