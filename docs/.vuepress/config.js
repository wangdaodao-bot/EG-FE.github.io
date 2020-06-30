const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '电子政务前端文档 ',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'Talk is cheap. Show me the code.',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: '规范',
        link: '/standard/',
      },
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: '勘误',
        link: 'https://github.com/EG-FE/EG-FE.github.io/issues/new'
      }
    ],
    sidebar: {
      '/standard/': [
        {
          title: '规范',
          collapsable: false,
          children: [
            '',
            'HTML',
            'CSS',
            'JavaScript',
            'JSON',
            'VUE',
            'CopyWriter',
          ]
        }
      ],
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            ''
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
