import Link from "next/link";

export default function Home() {
  return (
    <div className="auth-container"> <Link href="/login">SIGNUP</Link>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
         Welcome to the Next Auth APP
    </main>
    </div>
  )
}
