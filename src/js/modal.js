import { refs } from './base';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { signUp, signIn, updateUserProfile } from './firebase';
import { LocStorage } from './local-storage';
import { checkUserAuthState } from './auth-state';
import { async } from '@firebase/util';

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
  // counterId += 1;
  event.preventDefault();

  // console.log('Submit');

  const userName = event.currentTarget.elements.username.value.trim();
  const userEmail = event.currentTarget.elements.email.value.trim();
  const userPassword = event.currentTarget.elements.password.value.trim();
  let uid = '';

  if ((!isRegisteredUser && !userName) || !userEmail || !userPassword) {
    Notify.failure('Wrong email or password. Try again.');
    refs.form.reset();
    return;
  }

  if (isRegisteredUser) {
    // await signIn(userEmail, userPassword)
    //   .then(response => {
    //     if (!response) {
    //       Notify.failure('Wrong email or password. Try again.');
    //       // throw new Error();
    //       return;
    //     } else {
    //       Notify.success('You are signed in');
    //       LocStorage.setItem({
    //         name: response.user.displayName,
    //         email: userEmail,
    //         uid: response.user.uid,
    //       });
    //       checkUserAuthState();
    //     }
    //   })
    // .catch(() => {
    //   Notify.failure('Zadolbalo');
    //   return;
    // });

    const signInResponse = await signIn(userEmail, userPassword);
    if (!signInResponse) {
      Notify.failure('Wrong email or password. Try again.');
      return;
    }
    Notify.success('You are signed in');
    LocStorage.setItem({
      name: signInResponse.user.displayName,
      email: userEmail,
      uid: signInResponse.user.uid,
    });
    checkUserAuthState();
  } else {
    // await signUp(userEmail, userPassword).then(response => {
    //   if (!response) {
    //     Notify.failure('Wrong registration.Try again.');
    //   } else {
    //     updateUserProfile(userName);
    //     Notify.success(
    //       `Congratulation! New user ${userName} has just registered.`
    //     );
    //     LocStorage.setItem({ name: userName, email: userEmail, uid: response });
    //     checkUserAuthState();

    //   }
    // });
    const responseSignUp = await signUp(userEmail, userPassword);
    if (!responseSignUp) {
      Notify.failure('Wrong registration.Try again.');
      return;
    }
    await updateUserProfile(userName);
    Notify.success(`Congratulation! New user ${userName} has just registered.`);
    LocStorage.setItem({
      name: userName,
      email: userEmail,
      uid: responseSignUp,
    });
    checkUserAuthState();
  }

  refs.form.reset();
  refs.backdropModal.classList.add('visually-hidden');

  console.log(userEmail, userPassword);

  isRegisteredUser = '';
  refs.btnModalClose.removeEventListener('click', onModalBtnClose);
  refs.form.removeEventListener('submit', onFormSubmit);
}
