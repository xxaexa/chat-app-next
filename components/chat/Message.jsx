import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { ChatContext } from './../../context/ChatContext'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <div
      ref={ref}
      className={`px-4 flex  ${
        message.senderId === currentUser.uid && 'justify-end'
      }`}>
      <div className="my-2">
        <p className="bg-black px-2 py-1 rounded-xl">{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message
