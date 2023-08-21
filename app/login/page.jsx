'use client'

import { FormRow } from '@/components'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { redirect } from 'next/navigation'

const Page = () => {
  // configuration
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)
  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setErr(false)
      await signInWithEmailAndPassword(auth, email, password)
      alert('Login Success')
      redirect('/')
    } catch (error) {
      setErr(true)
    }
  }
  return (
    <div className="font-shipori flex min-h-screen items-center justify-center p-4 bg-colors">
      <div className="bg-glass p-4 w-96 rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center my-4 font-semibold text-2xl tracking-widest">
            CHAT APPS
          </h2>
          {err && (
            <p className="text-center text-red-500">Invalid Credential </p>
          )}
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
          />

          {/* Button */}
          <button className="bg-blue-500  px-2 py-1 rounded-lg mx-auto block my-8 text-white hover:text-blue-500 hover:bg-white ease-in-out duration-500">
            SIGN IN
          </button>

          {/* Text */}
          <p className="text-center tw">
            Don't Have Account ?
            <span
              className="cursor-pointer text-center"
              onClick={() => {
                router.push('/register')
              }}>
              &nbsp;Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Page
