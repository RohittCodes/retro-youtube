import { signOut } from "next-auth/react"

export default function SignOut() {
  return (
    <button className="rounded-lg w-full py-1 px-2" onClick={() => signOut()}>Signout</button>
  )
} 