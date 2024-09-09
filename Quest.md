# 问题

1. 描述列表tr宽度在vitepress不能充满一行
  原因是vitepress我自己定义了一个table是display:block
  但是这里引出来个问题这里的样式层级会比我的组件层级高组件库如何避免这种行为

  问题已解决给组件库添加display:table

  
2. 菜单反向色问题

3. vitepress 不能使用本地的alias

4. vitepress 不能用document的问题

解决方案
1. 在monted使用mounted 异步安装组件
2. index.js 中不能使用组件也可以在monted去使用外部暴露的函数进行调用,注意index.js里面绝对不能有document



5. table hover tooltip显示问题 我需要自己算吗
