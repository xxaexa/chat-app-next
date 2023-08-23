import { useContext, useState } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { ChatContext } from './../../context/ChatContext'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, storage } from './../../firebase/config'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'

// image

const Input = () => {
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    if (text === '') {
      return alert('Chat cant be empty')
    } else {
      if (img) {
        const storageRef = ref(storage, uuid())

        const uploadTask = uploadBytesResumable(storageRef, img)

        uploadTask.on(
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, 'chats', data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                })
              }
            )
          }
        )
      } else {
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        })
      }
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    setText('')
    setImg(null)
  }
  return (
    <div className="flex justify-between box-content h-16 border-l-2 border-black  border-t-2">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="px-2 w-full bg-none bg-transparent outline-none text-white placeholder:text-white"
        required
      />
      <div className="flex gap-2 items-center">
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <Image
            src="/image/img.svg"
            alt="addImage"
            className="w-8"
            width={100}
            height={100}
          />
        </label>

        <button onClick={handleSend}>
          <Image
            src="/image/send.svg"
            alt="send"
            className="w-8"
            width={100}
            height={100}
          />
        </button>
      </div>
    </div>
  )
}

export default Input
