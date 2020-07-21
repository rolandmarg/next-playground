import Link from 'next/link'
import { useSession } from 'next-auth/client'

const NavButtonClassName =
  'focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded'

export default function NavBar() {
  const [session, loading] = useSession()

  return (
    <header>
      <nav className="flex p-4">
        <Link href="/">
          <a className={NavButtonClassName}>Home</a>
        </Link>
        <Link href="/meetings">
          <a className={NavButtonClassName}>Schedule a call</a>
        </Link>
        <Link href="/apply">
          <a className={NavButtonClassName}>Apply</a>
        </Link>
        {!loading &&
          (!session ? (
            <Link href="/api/auth/signin">
              <a className={NavButtonClassName}>Sign in</a>
            </Link>
          ) : (
            <Link href="/api/auth/signout">
              <a className={NavButtonClassName}>Sign out</a>
            </Link>
          ))}
      </nav>
    </header>
  )
}
