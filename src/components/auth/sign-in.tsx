import { signIn } from "@/lib/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit" className="border rounded-lg py-1 px-2">Signin</button>
    </form>
  )
} 