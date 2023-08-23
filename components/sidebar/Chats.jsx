import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { ChatContext } from './../../context/ChatContext'
import { db } from './../../firebase/config'
import Image from 'next/image'

const Chats = () => {
  const [chats, setChats] = useState([])

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u })
  }

  return (
    <div className="h-[calc(610px-38px)] px-3">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="flex justify-between items-center"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}>
            <Image
              src={chat[1].userInfo.photoURL}
              width={100}
              height={100}
              alt={chat[1].userInfo.displayName}
              className="w-10 h-10 cursor-pointer rounded-full"
            />
            <div className="cursor-pointer">
              <span>{chat[1].userInfo.displayName}</span>
              <p className="text-right">
                {chat[1].lastMessage?.text.substring(0, 5)}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chats
