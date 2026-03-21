
    export type RemoteKeys = 'mfe_profile/Profile' | 'mfe_profile/register';
    type PackageType<T> = T extends 'mfe_profile/register' ? typeof import('mfe_profile/register') :T extends 'mfe_profile/Profile' ? typeof import('mfe_profile/Profile') :any;