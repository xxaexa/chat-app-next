import React, { useContext } from 'react'

import Messages from './chat/Messages'
import Input from './chat/Input'
import { ChatContext } from '../context/ChatContext'
import Image from 'next/image'

const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className="chat">
      <div className="bg-glass border-b-2 border-l-2 h-16 border-black flex items-center rounded-tr-lg">
        {data.user.photoURL === undefined ? null : (
          <Image
            src={data.user?.photoURL}
            alt={data.user?.displayName}
            width={120}
            height={120}
            className="mx-2 w-12 rounded-full"
          />
        )}

        <span className="px-2">{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
