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
    refs.btnGetUserProfile.disabled = true;
  } else {
    refs.userName.textContent = userData.name;
    refs.authLine.classList.add('visually-hidden');
    refs.btnSignOut.classList.remove('visually-hidden');
    refs.btnSignOut.addEventListener('click', onBtnSignOutClick);
    refs.authLine.removeEventListener('click', onAuthLineClick);
    refs.btnGetUserProfile.disabled = false;
  }
}

function onAuthLineClick(event) {
  const element = event.target.nodeName;
  if (element !== 'BUTTON') {
    return;
  }
  const elementAtr = event.target.attributes[1].name;
  openModal(elementAtr);
}

function onBtnSignOutClick() {
  // console.log('SIGNOUT');
  signOutOfFirebase();
  LocStorage.removeItem();
  checkUserAuthState();
  refs.btnGetUserProfile.disabled = true;
}
