import Chats from './sidebar/Chats'
import Nav from './sidebar/Nav'
import Search from './sidebar/Search'

const Sidebar = () => {
  return (
    <div>
      <Nav />
      <Chats />
      <Search />
    </div>
  )
}
export default Sidebar
