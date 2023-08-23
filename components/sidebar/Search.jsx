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
import Image from 'next/image'

const Search = () => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    setUser(null)
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    )

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUser(doc.data())
    })
    console.log(user)
    console.log(user === null)
    console.log(user === undefined)
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
    } catch (err) {
      setErr('')
    }
    setUser(null)
    setUsername('')
    setErr(false)
  }
  return (
    <div className="border-t-2 border-black relative">
      <div className="w-full h-16 items-center flex pr-2">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="px-2 w-full bg-none bg-transparent outline-none text-white placeholder:text-white "
        />
        <Image
          src="image/search.svg"
          alt="search"
          className="w-8 h-8 cursor-pointer"
          width={100}
          height={100}
          onClick={handleSearch}
        />
      </div>
      {err && (
        <span className="fixed bottom-16 bg-black bg-opacity-20 flex w-full py-2 px-2 items-center justify-between text-red-400 text-center">
          User not found!
        </span>
      )}

      {user && (
        <div
          className="fixed bottom-16 bg-black bg-opacity-20 flex w-full py-2 px-2 items-center justify-between"
          onClick={handleSelect}>
          <div>
            <Image
              src={user.photoURL}
              alt={user.displayName}
              className="w-12 h-12 rounded-full"
              width={100}
              height={100}
            />
            <span>{user.displayName}</span>
          </div>
          <button className="mx-2">
            <Image
              src="image/chat.svg"
              alt="close"
              className="w-12 h-12"
              width={100}
              height={100}
            />
            Chat
          </button>
        </div>
      )}
    </div>
  )
}

export default Search
