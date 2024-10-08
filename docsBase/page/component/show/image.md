# image

## 基本用法
:::demo
```html

  <TyImage src="../../../assets/js.jpg" class="bd" />
  <TyImage src="../../../assets/js.jpg"  class="bd ml-10"  shape="circle"/>

  <TyImage src="../../../assets/js.jpg"  class="bd ml-10" fit="none" />
  <TyImage src="../../../assets/js.jpg"  class="bd ml-10" fit="fill" />
  <TyImage src="../../../assets/js.jpg"  class="bd ml-10" fit="contain" />
  <TyImage src="../../../assets/js.jpg"  class="bd ml-10" fit="cover" />
  <TyImage src="../../../assets/js.jpg"  class="bd ml-10" fit="scale-down" />

```
:::

## 修改大小
:::demo
```html

  <TyImage src="../../../assets/js.jpg"  size="150"/>
```
:::

## 填充方式
:::demo
```html

  <TyImage src="../../../assets/js.jpg"  fit="contain" class="ml-10"/>

  <TyImage src="../../../assets/js.jpg"  fit="cover" class="ml-10"/>
```
:::

## 展示形状
:::demo
```html

  <TyImage src="../../../assets/js.jpg"  class="ml-10" />

  <TyImage src="../../../assets/js.jpg"  class="ml-10"  shape="circle" alt="图片"/>
```
:::

## 属性(Attributes)

<div class="listTb">

| 属性      | 描述    | 类型      | 默认       | 
|----- |----- |----- |----- |
| src     | image的图片地址(required)  | string  | '' |
| size     | 图片的大小  | string  | '100' |
| shape     | 组件的展示形状  |  'square'/'circle' | 'square' |
| fit     | 填充形式 | string  | 'none'/'fill'/'contain'/'cover'/'scale-down' |
| alt     | 图片失效后的文字展示形式 | string  | '' |

</div>