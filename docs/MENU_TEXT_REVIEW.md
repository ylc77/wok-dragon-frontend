# Wok Dragon 菜单文字化校对底稿

本文件用于把当前 16 张菜单照片逐步整理成可搜索、可切换 Greek / English / Chinese 的结构化文字菜单。

当前线上菜单以照片为准。结构化文字菜单上线前，菜名、价格、辣度、套餐内容必须人工核对。

## 处理原则

- 希腊语默认显示，英文和中文可切换。
- 英文菜名优先按菜单图片原文录入。
- 希腊语菜名优先按菜单图片原文录入。
- 中文菜名先按常见中餐译名生成，再人工校对。
- 价格必须逐项人工核对，不用自动 OCR 结果直接上线。
- 图片反光、旋转、遮挡、边缘缺失的位置标记为 `待核对`。

## 页面对应关系

| 图片 | 页面/分类 | 中文分类名 | 状态 |
| --- | --- | --- | --- |
| page-01.jpg | Menu for 1 | 单人套餐 | 待录入套餐 A-D |
| page-02.jpg | Menu for 2 | 双人/多人套餐 | 待录入套餐 1-4 |
| page-03.jpg | Soup / Salad | 汤类 / 沙拉 | 待录入 1-8、27-29 |
| page-04.jpg | Appetizers | 前菜 | 待录入 10-25 |
| page-05.jpg | Soup Noodle / Rice Noodle in Soup | 汤面 / 汤粉 | 待录入 30-42 |
| page-06.jpg | Fried Noodles / Fried Rice Noodles | 炒面 / 炒米粉 | 待录入 45-69 |
| page-07.jpg | Fried Rice | 炒饭 | 待录入 75-84 |
| page-08.jpg | Duck | 鸭类 | 待录入 90-100 |
| page-09.jpg | Beef | 牛肉 | 待录入 105-115 |
| page-10.jpg | Chicken | 鸡肉 | 待录入 120-131 |
| page-11.jpg | Pork | 猪肉 | 待录入 151-167 |
| page-12.jpg | Seafood | 海鲜 | 待录入 170-189 |
| page-13.jpg | Claypot / Dishes with Rice | 砂锅 / 盖饭 | 待录入 135-139、210-217 |
| page-14.jpg | Vegetable | 蔬菜 / 豆腐 | 待录入 220-240 |
| page-15.jpg | Kids Meal / Sweets / Explanations | 儿童餐 / 甜品 / 说明 | 待录入 85-86、297-301、说明 |
| page-16.jpg | Drinks | 饮品 | 待录入 255-296 |

## 建议录入格式

```ts
{
  number: '1',
  categoryId: 'soups',
  nameEl: 'Σούπα καυτερή και ξινή',
  nameEn: 'Hot and sour soup',
  nameZh: '酸辣汤',
  price: '4.90',
  spicy: true,
  needsReview: false,
}
```

## 下一步执行顺序

1. 先录入 `Menu for 1` 和 `Menu for 2`，因为套餐数量少，最容易校对。
2. 再录入 `Soup / Salad`、`Appetizers`、`Drinks`。
3. 最后录入肉类、海鲜、蔬菜等大分类。
4. 全部录入后，在 `/menu` 增加“图片菜单 / 文字菜单”切换。
5. 文字菜单默认按当前语言显示，只在需要时显示其他语言辅助信息。

## 人工核对重点

- 照片中旋转页面的文字方向。
- 反光覆盖的菜名和价格。
- 辣椒标识是否对应正确菜品。
- 套餐内容是否包含数量，例如 `x2`、`x4`、`1/2 roasted duck`。
- 菜号 54、173、185、188、226、240、264、296 等之前已校正过的价格，需和新照片再次比对。
