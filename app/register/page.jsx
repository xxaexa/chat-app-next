'use client'

import { FormRow } from '@/components'
import { useState } from 'react'
import { auth, db, storage } from '@/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import Link from 'next/link'
import Image from 'next/image'

const Page = () => {
  // configuration
  const [err, setErr] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = name
    const file = e.target[3].files[0]
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password)
      alert('Account Created')
      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)
      //
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {})
          } catch (error) {
            setError(JSON.stringify(error.code))
            setErr(true)
          }
        })
      })
    } catch (error) {
      setError(JSON.stringify(error.code))
      setErr(true)
    }
  }
  return (
    <div className="bg-colors flex min-h-screen items-center justify-center p-4  font-shipori tracking-widest">
      <div className="bg-glass p-4 w-96 rounded-lg  ">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center tw my-4 font-semibold text-2xl">
            CHAT APPS
          </h2>
          {err && <p className="text-center text-red-300">{error}</p>}

          {/* Name Field*/}
          <FormRow
            name={'name'}
            type={'text'}
            placeholder={'NAME'}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email Field */}
          <FormRow
            name={'email'}
            type={'email'}
            placeholder={'EMAIL'}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <FormRow
            name={'password'}
            type={'password'}
            placeholder={'PASSWORD'}
            onChange={(e) => setPassword(e.target.value)}
            required
            autocomplete="new-password"
          />

          {/* Image */}
          <div className="flex flex-row items-center bg-white rounded-lg">
            <Image
              src="image/imgpp.svg"
              width={100}
              height={100}
              alt="imgpp"
              className="w-12 mx-2"
            />
            <label htmlFor="file" className="text-slate-700 cursor-pointer">
              Upload Image for your profile
            </label>
            <input id="file" type="file" name="file" className="hidden" />
          </div>

          {/* Button */}
          <button className="bg-blue-500  px-2 py-1 rounded-lg mx-auto block my-8 text-white hover:text-blue-500 hover:bg-white ease-in-out duration-500">
            SIGN UP
          </button>

          {/* Text */}
          <p className="text-center tw">
            Don't Have Account ?
            <Link href={'/login'}>
              <span className="cursor-pointer text-center">&nbsp;Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Page
