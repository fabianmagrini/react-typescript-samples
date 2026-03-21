declare module 'mfe_dashboard/Dashboard' {
  const Dashboard: React.ComponentType;
  export default Dashboard;
}

declare module 'mfe_dashboard/register' {
  export function registerRoutes(): void;
}

declare module 'mfe_profile/Profile' {
  const Profile: React.ComponentType;
  export default Profile;
}

declare module 'mfe_profile/register' {
  export function registerRoutes(): void;
}
