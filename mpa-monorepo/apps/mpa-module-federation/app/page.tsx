import { redirect } from 'next/navigation'

// Root redirect — no content at /; send to the dashboard page.
export default function Home() {
  redirect('/dashboard')
}
