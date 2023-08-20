import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBkeg7mQn-bCE8LtW3PtI8ejXDQqpECIxI',
  authDomain: 'chat-e7f4c.firebaseapp.com',
  projectId: 'chat-e7f4c',
  storageBucket: 'chat-e7f4c.appspot.com',
  messagingSenderId: '939709212681',
  appId: '1:939709212681:web:983d06713bfc44d266f0d8',
}

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig)

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
