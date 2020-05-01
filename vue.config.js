module.exports = {
  devServer: {
    proxy: {
      '^/api': {
          target: 'http://localhost:8082',
          ws: true,
          secure: false
      }
    }
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
