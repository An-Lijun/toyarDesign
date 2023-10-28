import { defineConfig } from 'vitepress';
import sidebars from '../sidebars'
// https://vitepress.dev/reference/site-config
import  mdContainer from 'markdown-it-container'
function useMd(md){
  md.use(mdContainer, 'demo', {
    validate(params) {
      //函数在开始标记后验证尾部，成功时返回true
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `
        <demo-block>
          <template #demo>
             ${content}
          </template>
          ${description ? ` <template #description>${md.render(description)}</template>` : ''}
          <template #source>
        `;
      }else{
        // return `</template></demo-block>`;
        return `</template></demo-block>`
      }
     
    }
  })

}

export default defineConfig({

  title:'Toyar',
  description: 'A config Vue component',
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    nav: [
      { text: "指南", link: "/page/guid/style" },
      { text: "组件", link: "/page/component/button" },
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
    },
    config: (md)=>useMd(md),
  },
});
