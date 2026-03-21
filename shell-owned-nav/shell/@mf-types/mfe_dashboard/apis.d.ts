
    export type RemoteKeys = 'mfe_dashboard/Dashboard' | 'mfe_dashboard/register';
    type PackageType<T> = T extends 'mfe_dashboard/register' ? typeof import('mfe_dashboard/register') :T extends 'mfe_dashboard/Dashboard' ? typeof import('mfe_dashboard/Dashboard') :any;