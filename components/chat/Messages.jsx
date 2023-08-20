import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from './../../context/ChatContext'
import { db } from './../../firebase/config'
import Message from './Message'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])

  console.log(messages)

  return (
    <div className=" border-l-2 h-[calc(610px-38px)]  border-black items-center overflow-auto">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
