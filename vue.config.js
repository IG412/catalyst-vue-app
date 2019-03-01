const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')

process.env.VUE_APP_VERSION = require('./package.json').version

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'

// const createApiFile = TARGET_NODE
//   ? './create-api-server.js'
//   : './create-api-client.js'

const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production',
    loaderOptions: {
      sass: {
        indentedSyntax: true,
        data: '@import "~@/sass/shared.sass"'
      }
    }
  },
  configureWebpack: () => ({
    entry: `./src/entry-${target}`,
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ],
    externals: TARGET_NODE
      ? nodeExternals({
          whitelist: /\.css$/
        })
      : undefined,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    optimization: {
      splitChunks: undefined
    },
    resolve: {
      alias: {
        './api.js': TARGET_NODE ? './api-server.js' : './api-client.js'
      }
    }
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => Object.assign(options, { optimizeSSR: false }))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  }
}
