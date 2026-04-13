import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAIo9wW69PT2i3ZHvZxxz7PfNJ_0ERyUJw",
  authDomain: "beadsville-74518.firebaseapp.com",
  projectId: "beadsville-74518",
  storageBucket: "beadsville-74518.firebasestorage.app",
  messagingSenderId: "378820636408",
  appId: "1:378820636408:web:027cb77ebcc89f2814150d",
  measurementId: "G-61ZB80YMP1"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
