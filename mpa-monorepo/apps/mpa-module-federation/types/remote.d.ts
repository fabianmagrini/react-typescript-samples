// Type declarations for module-federated remotes.
// These let TypeScript resolve `import('remote/...')` calls without errors.

declare module 'remote/DashboardWidget' {
  const DashboardWidget: React.ComponentType
  export default DashboardWidget
}

declare module 'remote/ProfileWidget' {
  const ProfileWidget: React.ComponentType
  export default ProfileWidget
}
