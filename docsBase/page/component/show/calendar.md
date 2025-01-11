# Calendar
日历组件。
## 基础用法
展示和选择日历

:::demo
```html
<TyCalendar />
```
:::

## 属性(Attributes)

<div class="listTb">

| 属性   | 描述                   | 类型    | 默认                                   |          |
| ------ | ---------------------- | ------- | -------------------------------------- | -------- |
| dayItemHeight   | 日期单元格的高度             | string  | Number                                 | 110       |

</div>

## 插槽(Slot)

<div class="listTb">

| 插槽名  | 描述                   |    值  | 
| ----- | ---------------------- | ------ | 
| controller | 组件头部 |  |
| dayItem | 日期单元格 | `data{day:'YYYY-MM-DD',type:'before/now/after'}` |

</div>

## 事件(Slot)

<div class="listTb">

| 插槽名  | 描述                   | 
| ----- | ---------------------- | 
| lastYear | 上一年 | 
| lastMonth | 上一月 | 
| nextMonth | 下一年 | 
| nextYear | 下一年 | 
| goTday | 去今天 | 
| getNowDate | 获取当天日期 | 


</div>