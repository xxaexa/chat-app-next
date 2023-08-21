import { useContext } from 'react'
import { auth } from '@/firebase/config'
import { AuthContext } from '@/context/AuthContext'
import { signOut } from 'firebase/auth'
import Image from 'next/image'

const Nav = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="flex justify-between items-center h-16 px-2 border-b-2 border-black bg-white bg-opacity-20 backdrop-blur-lg rounded-tl-lg">
      {currentUser.length === 0 ? (
        <p>Loading</p>
      ) : (
        <>
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName}
            className="w-12 h-12 rounded-full"
          />
        </>
      )}
      <button onClick={() => signOut(auth)}>
        <Image src={'/image/logout.svg'} width={35} height={35} alt="logout" />
      </button>
    </div>
  )
}

export default Nav
