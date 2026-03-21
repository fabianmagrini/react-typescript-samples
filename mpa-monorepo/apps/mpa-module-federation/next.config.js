// @ts-check
const path = require('path')

process.env.FEDERATION_WEBPACK_PATH = path.resolve(
  __dirname,
  '../../node_modules/webpack/lib/index.js',
)

const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      // Server compilation: stub out remote/* imports so webpack doesn't fail
      // with "Module not found". The DashboardWidgetLoader uses { ssr: false }
      // so the stubs are never actually called at runtime.
      const existingExternals = config.externals || []
      config.externals = [
        ...(Array.isArray(existingExternals) ? existingExternals : [existingExternals]),
        ({ request }, callback) => {
          if (request && request.startsWith('remote/')) {
            // Return an empty module
            return callback(null, `commonjs null`)
          }
          callback()
        },
      ]
    } else {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'host',
          remotes: {
            remote: `remote@${process.env.REMOTE_URL ?? 'http://localhost:4001'}/mf-manifest.json`,
          },
          shared: {
            react: { singleton: true, requiredVersion: '^19.0.0' },
            'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          },
          dts: false,
        }),
      )
    }
    return config
  },
}

module.exports = nextConfig
