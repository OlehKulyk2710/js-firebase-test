import { usersData } from '../index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const URL =
  'https://filmoteka-project2-default-rtdb.europe-west1.firebasedatabase.app';
const API = 'AIzaSyB6zHPU06WTT-Wfbp-gtmlww2BBH4EyQx0';
const folder = 'library-test';
// const folder = 'library_olehkul@ukr_net';

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

// DATBASE -------------------
