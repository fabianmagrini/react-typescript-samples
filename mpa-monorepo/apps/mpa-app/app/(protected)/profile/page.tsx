import ProfileIsland from '@/components/islands/ProfileIsland'
import { getSession } from '@/lib/auth'

export default async function ProfilePage() {
  const user = await getSession()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>
      <ProfileIsland initialUser={user!} />
    </div>
  )
}
