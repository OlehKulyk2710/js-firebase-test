export const refs = {
  btnGetUserProfile: document.querySelector('.get-userProfile'),
  btnSignOutExtra: document.querySelector('.signOut-extra'),
  btnGet: document.querySelector('.get'),
  btnPost: document.querySelector('.post'),
  // btnDelete: document.querySelector('.del'),
  userName: document.querySelector('.auth-username'),
  authLine: document.querySelector('[js-auth]'),
  btnSignOut: document.querySelector('.auth-signOut'),
  backdropModal: document.querySelector('.backdrop'),
  titleModal: document.querySelector('.modal-title'),
  btnModalClose: document.querySelector('.btn-close'),
  form: document.querySelector('.form'),
  formUserName: document.querySelector('.username-label'),
  // btnModalSubmit: document.querySelector('.form-submit'),
};

export const defaultUserData = {
  name: 'Anonymous',
  email: 'test@test.com',
  uid: 'USsPfcF0kUZ7u3BIzTca8upTQO03',
};

// console.log(refs.btnSignOut);
