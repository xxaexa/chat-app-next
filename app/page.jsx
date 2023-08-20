'use client'

import { Sidebar, Chat } from '@/components'

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-10/12 rounded-lg mx-auto flex  ">
        <div className="w-1/3 bg-white bg-opacity-20 backdrop-blur-lg h-[700px] rounded-l-xl">
          <Sidebar />
        </div>
        <div className="w-2/3 bg-white bg-opacity-20 backdrop-blur-lg rounded-r-xl h-[700px]">
          <Chat />
        </div>
      </div>
    </div>
  )
}
export default Home
