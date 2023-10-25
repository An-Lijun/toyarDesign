import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title:'Toyar',
  description: 'A config Vue component',

  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    nav: [
      { text: '主页', link: '/index' },
      { text: 'API', link: '/home' },
    ],
    sidebar: [
        {
            text: 'API',
        },
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Anlijun'
    }
       
  },
  markdown: {
    theme: {
        light: 'light-plus',
        dark: 'github-dark',
    },
},
});
