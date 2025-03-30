import { currentUser } from '@clerk/nextjs/server'
import NavbarContent from './NavbarContent'

async function Navbar() {
  const user = await currentUser()
  return <NavbarContent userExists={!!user} />
}

export default Navbar