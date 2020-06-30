const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '电子政务前端文档 ',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

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
    repo: 'EG-FE/EG-FE.github.io',
    editLinks: true,
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'EG-FE/EG-FE.github.io',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'develop',
    
    editLinkText: '帮助我们改善此页面',
    lastUpdated: '文档更新时间',
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
        text: '组件',
        link: 'https://uxd.const.team/'
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
  plugins: {
    '@vuepress/back-to-top':{},
    '@vuepress/medium-zoom': {
      selector: 'img'
    },
    '@vuepress/last-updated': {
      transformer: (timestamp) => {
        const moment = require('moment')
        moment.locale('zh-cn')
        return moment(timestamp).fromNow()
      }
    }
  }
}
