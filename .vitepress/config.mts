import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  base: '/yamazakilab-wiki/',
  srcDir: 'src',
  title: "Yamazakilab-wiki",
  description: "YNU山崎研究室における知見や経験をwikiとして共有します",
  head: [
    ['script', { async: true, src: 'https://www.googletagmanager.com/ns.html?id=GTM-M4Z2H3LQ' }],
    [
      'script',
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GTM-M4Z2H3LQ');
      `
    ],
    ["link", { rel: "icon", href: "https://rd070672.github.io/yamazakilab-wiki/images/favicon.png" }],
    ["meta", { property: "og:image", content: "https://rd070672.github.io/yamazakilab-wiki/images/top.jpg" }],
    ["meta", { property: "og:site_name", content: "YNU山崎研究室" }],
    ["meta", { property: "twitter:card", content: "summary" }],
    ["meta", { property: "twitter:site", content: "@yamazakilab-ynu"}],
    ["meta", { property: "twitter:title", content: "YNU山崎研究室"}],
    ["meta", { property: "twitter:description", content: "YNU山崎研究室における知見や経験をwikiとして共有します"}],
    ["meta", { property: "twitter:image", content: "https://rd070672.github.io/yamazakilab-wiki/images/top.jpg" }]
  ],
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ホームページ', link: 'https://tyamazaki.com' },
      { text: '計算', link: '/registration' },
      { text: '実験', link: '/timetable' },
      { text: 'データサイエンス', link: '/about-sponsorship'},
      { text: 'ラボ運営', items: [
          { text: '2025年度', link: '/'},
          { text: '2024年度', link: '/'},
          { text: '2023年度', link: '/'}
      ]},
      { text: 'その他', link: '/others'},
    ],
    sidebar: [
      { text: 'Home', link: '/' },
      { text: '計算', items: [
          { text: 'VASP v6.5.1のインストール方法', link: '/'},
          { text: 'VASPを用いたDFT計算', link: '/'},
          { text: 'MAELAS v3.0', link: '/'}
      ]},
      { text: '実験', items: [
          { text: '装置類の引っ越し', link: '/'},
          { text: '土禁・フロアマット', link: '/'},
      ]},
      { text: 'データサイエンス', link: '/about-sponsorship'},
      { text: 'ラボ運営', items: [
          { text: '装置類の引っ越し', link: '/'},
          { text: '土禁・フロアマット', link: '/'},
          { text: '机・椅子（居室）', link: '/'},
          { text: '机・椅子（実験室）', link: '/'},
          { text: 'Wi-Fiのセットアップ', link: '/'},
        
          { text: '家電類', link: '/'},
          { text: 'サーバールーム', link: '/'},
          { text: 'クリーンベンチ', link: '/'},
          { text: 'シンク周り', link: '/'},
      ]},
      { text: 'その他', link: '/others'},
    ],
    socialLinks: [
      { icon: 'x', link: 'https://x.com/yamazakilab-ynu' },
      { icon: 'github', link: 'https://github.com/rd070672/yamazakilab-wiki' }
    ],
    footer: {
      copyright: '© 2026 Yamazaki Lab',
    },
  },

  // https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPHome.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBarHamburger\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPNavBarHamburger.vue', import.meta.url)
          )
        }

      ]
    }
  },

})
