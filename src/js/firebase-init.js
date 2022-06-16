import { usersData } from '../index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB6zHPU06WTT-Wfbp-gtmlww2BBH4EyQx0',
//   authDomain: 'filmoteka-project2.firebaseapp.com',
//   databaseURL:
//     'https://filmoteka-project2-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'filmoteka-project2',
//   storageBucket: 'filmoteka-project2.appspot.com',
//   messagingSenderId: '660298397256',
//   appId: '1:660298397256:web:554a4c6f7606a778a94a7d',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

const URL =
  'https://filmoteka-project2-default-rtdb.europe-west1.firebasedatabase.app';
// const folder = 'library';
const folder = 'library_olehkul@ukr_net';

export function getData() {
  fetch(`${URL}/${folder}/post.json`)
    .then(response => response.json())
    .then(data => {
      if (!data) {
        Notify.failure('Your wishlist is EMPTY. Add anything');
        return;
      }

      Notify.success('Well done! Look at the console.');
      console.log(data);
    });
}

export function postData() {
  fetch(`${URL}/${folder}/post.json`, {
    method: 'POST',
    body: JSON.stringify(usersData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
