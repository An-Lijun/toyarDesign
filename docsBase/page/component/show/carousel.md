# carousel

## 基本使用 1

:::demo

```html
<TyCarousel style="width: 500px;">
  <TyCarouselItem>
    <img src="../../../assets/banner_01.jpeg" style="width: 100%;" alt="" />
  </TyCarouselItem>
  <TyCarouselItem>
    <img src="../../../assets/banner_02.jpeg" style="width: 100%;" alt="" />
  </TyCarouselItem>
  <TyCarouselItem>
    <img src="../../../assets/banner_03.jpeg" style="width: 100%;" alt="" />
  </TyCarouselItem>
</TyCarousel>
```

:::

## 基本使用 2

:::demo

```html
<TyCarousel style="width: 500px;" :showIndicator="false">
  <TyCarouselItem>
    <img src="../../../assets/banner_01.jpeg" alt="" />
  </TyCarouselItem>
  <TyCarouselItem>
    <img src="../../../assets/banner_02.jpeg" alt="" />
  </TyCarouselItem>
  <TyCarouselItem>
    <img src="../../../assets/banner_03.jpeg" alt="" />
  </TyCarouselItem>
</TyCarousel>
```

:::

## 基本使用 3

:::demo

```html
<TyCarousel style="width: 500px;" :interval="500">
  <TyCarouselItem>
    <img src="../../../assets/banner_01.jpeg" alt="" />
  </TyCarouselItem>
  <TyCarouselItem>
    <img src="../../../assets/banner_02.jpeg" alt="" />
  </TyCarouselItem>
  <TyCarouselItem>
    <img src="../../../assets/banner_03.jpeg" alt="" />
  </TyCarouselItem>
</TyCarousel>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性          | 描述               | 类型    | 默认 |
| ------------- | ------------------ | ------- | ---- |
| showIndicator | 是否展示左右指示器 | boolean | true |
| interval      | 切换时间毫秒       | string  | 3000 |

</div>
