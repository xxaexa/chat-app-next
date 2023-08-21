import { AuthContext } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import { useContext } from 'react'

const ProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return redirect('/login')
  }
}
export default ProtectedRoute
