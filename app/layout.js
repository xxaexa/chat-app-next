import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { ChatContextProvider } from '@/context/ChatContext'

export const metadata = {
  title: 'Chat App',
  description: 'create a chat app with react next.js tailwind firebase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-shipori bg-colors">
        <AuthContextProvider>
          <ChatContextProvider>{children}</ChatContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
