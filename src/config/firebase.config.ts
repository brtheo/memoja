import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC_5bt_r7Eo4m0rcVpwg1_8XEKVzVzqqtA",
  authDomain: "memoja-1d38e.firebaseapp.com",
  databaseURL: "https://memoja-1d38e.firebaseio.com",
  projectId: "memoja-1d38e",
  storageBucket: "memoja-1d38e.appspot.com",
  messagingSenderId: "555990287598",
  appId: "1:555990287598:web:b705c0cba72468c7ae9fff",
  measurementId: "G-TLKS50S6EL"
}

firebase.initializeApp(firebaseConfig)
export default firebase
export const auth = firebase.auth()