import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyAcgRjWu3tYvv_3g9XbyIB2FPdAeGmUFtM',
  authDomain: 'my-notes-70772.firebaseapp.com',
  databaseURL: 'https://my-notes-70772.firebaseio.com',
  projectId: 'my-notes-70772',
  storageBucket: 'my-notes-70772.appspot.com',
  messagingSenderId: '501904360047',
  appId: '1:501904360047:web:18b8f6085d975d9e4e439a',
  measurementId: 'G-4Z59XWG8L9',
};
// Initialize Firebase
const fire = firebase.initializeApp(config);
export default fire;
