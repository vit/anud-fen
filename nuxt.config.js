
const env = require('dotenv').config();
console.log(env);

module.exports = {
  env: env.parsed,
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  css: [
     'assets/custom-bulma.sass',
//    '@/assets/scss/main.scss'
      '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    ['@nuxtjs/pwa', {}],
//      ['nuxt-buefy', { css: false, materialDesignIcons: false }],
  ],

pwa: {
  manifest: {
      "name": "Academy of Navigation and Motion Control",
      "short_name": "acanud",
      "description": "Academy of Navigation and Motion Control",
      "icons": [],
//      "display": "standalone",
      "display": "fullscreen",
      "background_color": "#ffffff",
//      "theme_color": "#3B8070"
      "theme_color": "#000077"
  }
},

plugins: [
  '~/plugins/fontawesome.js',
  '~/plugins/buefy.js',
  { ssr: false, src: '~/plugins/hello-client.js' }
],

//  router: {
//    middleware: 'check-auth'
//  },
router: {
  middleware: ['wp-path-load']
},


  /*
  ** Headers of the page
  */
  head: {
    title: 'acanud',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'acanud.ru site' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

