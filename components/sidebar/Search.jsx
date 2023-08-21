import React, { useContext, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore'
import { db } from './../../firebase/config'
import { AuthContext } from './../../context/AuthContext'
const Search = () => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    )

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (err) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, 'chats', combinedId))

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {}

    setUser(null)
    setUsername('')
  }
  return (
    <div className="border-t-2 border-black relative">
      <div className="w-full h-16 items-center flex pr-2">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="px-2 w-full bg-none bg-transparent outline-none text-white placeholder:text-white "
        />
        <img src="image/search.svg" alt="" className="w-8 h-8" />
      </div>
      {err && (
        <span className="fixed bottom-16 bg-black bg-opacity-20 flex w-full py-2 px-2 items-center justify-between text-red-400">
          User not found!
        </span>
      )}
      {user && (
        <div
          className="fixed bottom-16 bg-black bg-opacity-20 flex w-full py-2 px-2 items-center justify-between"
          onClick={handleSelect}>
          <div>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full"
            />
            <span className="px-3">{user.displayName}</span>
          </div>
          <button className="mx-2">
            <img src="image/chat.svg" alt="close" className="w-12 h-12" />
            Chat
          </button>
        </div>
      )}
    </div>
  )
}

export default Search
