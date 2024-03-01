import startMenu from './page/component/start'
import baseMenu from './page/component/base'
import feedBackMenu from './page/component/feedback'
import layoutMenu from './page/component/layout'
import showMenu from './page/component/show'
import formMenu from './page/component/form'
export default {
  "page/guid": [
    {
      text: "开发指南",
      items: [
        {
          text: "风格",
          link: "page/guid/style",
        },
        {
          text: "安装",
          link: "page/guid/install",
        },
      ],
    },
  ],
  "page/component": [
    startMenu,
    baseMenu,
    layoutMenu,
    formMenu,
    showMenu,
    feedBackMenu
  ],

}
