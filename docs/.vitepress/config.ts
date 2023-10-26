import { defineConfig } from 'vitepress';
import sidebars from '../sidebars'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title:'Toyar',
  description: 'A config Vue component',
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    nav: [
      { text: "指南", link: "/page/guid/install" },
      { text: "组件", link: "/examples/button/" },
    ],
    sidebar: sidebars,
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
    }
  },
});
