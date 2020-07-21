import Link from 'next/link'
import { useSession } from 'next-auth/client'

const NavLink = ({ href, text }) => (
  <Link href={href}>
    <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
      {text}
    </a>
  </Link>
)

export default function NavBar() {
  const [session, loading] = useSession()

  return (
    <header>
      <nav className="flex p-4">
        <NavLink href="/" text="Home" />
        <NavLink href="/meetings" text="Schedule a call" />
        <NavLink href="/apply" text="Apply" />

        {!loading &&
          (!session ? (
            <NavLink href="/api/auth/signin" text="Sign in" />
          ) : (
            <NavLink href="/api/auth/signout" text="Sign out" />
          ))}
      </nav>
    </header>
  )
}
