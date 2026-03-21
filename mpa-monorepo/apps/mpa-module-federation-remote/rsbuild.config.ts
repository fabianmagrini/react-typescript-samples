import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack'

const port = Number(process.env.REMOTE_PORT ?? 4001)

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  server: {
    port,
    // Fail immediately if the port is taken rather than silently bumping to
    // the next free port with a stale assetPrefix baked into the manifest.
    strictPort: true,
  },
  dev: {
    assetPrefix: `http://localhost:${port}/`,
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'remote',
          filename: 'remoteEntry.js',
          exposes: {
            './DashboardWidget': './src/components/DashboardWidget',
            './ProfileWidget': './src/components/ProfileWidget',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: '^19.0.0',
            },
            'react-dom': {
              singleton: true,
              requiredVersion: '^19.0.0',
            },
          },
          dts: false,
        }),
      ],
    },
    postcss: {
      postcssOptions: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },
})
