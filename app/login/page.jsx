'use client'

import { FormRow } from '@/components'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
  // configuration
  const router = useRouter()

  // Real Account
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Demo account
  const [emailDemo, setEmailDemo] = useState('demo@test.com')
  const [passwordDemo, setPasswordDemo] = useState('demo1234')

  const [err, setErr] = useState(false)
  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setErr(false)
      alert('Login Success')
      return router.push('/')
    } catch (error) {
      console.log(error)
      setErr(true)
    }
  }
  // Handle submit
  const handleSubmitDemo = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, emailDemo, passwordDemo)
      setErr(false)
      return router.push('/')
    } catch (error) {
      setErr(true)
    }
  }
  return (
    <div className="font-shipori flex min-h-screen items-center justify-center p-4 bg-colors">
      <div className="bg-glass p-4 w-96 rounded-lg">
        {/* Login  */}
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
            LOGIN
          </button>
        </form>

        {/* Login with demo account */}
        <form onSubmit={handleSubmitDemo}>
          <div className="hidden">
            {/* Email Field */}
            <input
              type="text"
              name="nameDemo"
              onChange={(e) => setPassword(e.target.value)}
              className="text-black"
            />
            {/* Password Field */}
            <input
              type="password"
              name="passwordDemo"
              className="text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-blue-500  px-2 py-1 rounded-lg mx-auto block my-8 text-white hover:text-blue-500 hover:bg-white ease-in-out duration-500">
            LOGIN DEMO
          </button>
        </form>

        {/* Text */}
        <p className="text-center tw">
          Dont Have Account ?
          <Link href={'/register'}>
            <span className="cursor-pointer text-center">&nbsp;Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
export default Page
