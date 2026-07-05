# Wok Dragon 前台网站

这是 Wok Dragon 餐厅前台展示项目，使用 React、Vite 和 TypeScript 构建。

项目定位是一个轻量餐厅官网，用来展示首页、菜单、地图、联系方式和预约请求。当前只做前台展示，不包含后台管理、数据库、在线点餐或支付。

## 当前功能

- 首页：红白黑品牌风格，移动端参考 Fridays.gr 的节奏。
- 菜单页：按分类展示菜品、价格和分类图片，不为每道菜生成假图片。
- 预约页：前端预约表单，支持必填校验和成功提示。
- 地图页：嵌入 Google Maps，并提供外部地图链接。
- 联系页：展示地址、电话和营业时间。
- 双语切换：默认希腊语，可切换英文。
- 响应式布局：桌面端和移动端都可使用。

## 技术栈

- React
- Vite
- TypeScript
- React Router
- Plain CSS
- lucide-react

## 本地运行

安装依赖：

```bash
npm install
```

启动前台预览：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

代码检查：

```bash
npm run lint
```

预览生产构建：

```bash
npm run preview
```

## 预约功能说明

当前预约表单默认是前端演示模式，不会真正发送数据。

如果后续要把预约发送到 Telegram，可以使用项目里的本地 API 示例：

```bash
npm run dev:api
```

需要配置环境变量：

```env
VITE_RESERVATION_API_ENABLED=true
TELEGRAM_BOT_TOKEN=你的 Telegram Bot Token
TELEGRAM_CHAT_ID=接收预约消息的 Chat ID
LOCAL_API_PORT=8787
```

不要把真实的 `TELEGRAM_BOT_TOKEN` 或其他密钥提交到 GitHub。

## 环境变量

项目提供了 `.env.example`：

```env
VITE_RESERVATION_API_ENABLED=false
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
LOCAL_API_PORT=8787
```

本地真实配置请新建 `.env`，该文件已经被 `.gitignore` 忽略。

## 数据来源

菜单内容来自用户最新提供的 16 张实体菜单照片：

- 菜单照片：`public/menu-photos/page-01.jpg` 至 `public/menu-photos/page-16.jpg`
- 照片菜单数据：`src/data/menuPhotos.ts`
- 已文字化套餐数据：`src/data/setMenusStructured.ts`
- OCR 初稿：`docs/MENU_OCR_DRAFT.md`
- 人工校对底稿：`docs/MENU_TEXT_REVIEW.md`
- 联系信息：`src/data/contact.ts`

Google Maps 链接已使用用户提供的 Wok Dragon EXPRESS 地图链接。

## 是否需要 Supabase

当前阶段不需要 Supabase。

只有在后续要做这些功能时，才建议接入数据库：

- 后台查看预约记录
- 菜单后台编辑
- 会员登录
- 在线点餐
- 订单或支付记录

当前推荐部署方式是 GitHub + Vercel。预约通知如果需要上线，可以后续接 Telegram Bot + Vercel API。

## 目录结构

```txt
src/
  components/
    Header.tsx
    HeroCollage.tsx
    LanguageProvider.tsx
    ReasonSection.tsx
    FloatingFoodShowcase.tsx
    PromoActions.tsx
    ReservationSection.tsx
    MapContactSection.tsx
    Footer.tsx
    MobileQuickNav.tsx
    languageContext.ts
  data/
    contact.ts
    images.ts
    menuPhotos.ts
    setMenusStructured.ts
    site.ts
  routes/
    HomePage.tsx
    MenuPage.tsx
    ReservationPage.tsx
    LocationPage.tsx
    ContactPage.tsx
  styles/
    global.css
  types/
    contact.ts
    menu.ts
    reservation.ts
```

## 部署建议

推荐部署到 Vercel：

1. 上传项目到 GitHub。
2. 在 Vercel 导入 GitHub 仓库。
3. Framework 选择 Vite。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。
6. 如果暂时不用真实 Telegram 通知，保持 `VITE_RESERVATION_API_ENABLED=false`。

## 第一版范围

已包含：

- 首页
- 菜单页
- 预约页
- 地图页
- 联系页
- 双语切换
- 移动端适配
- 前端预约表单

暂未包含：

- Supabase 数据库
- 后台管理
- 真实预约存储
- 在线点餐
- 支付
- CMS 内容管理

## 上传 GitHub 前检查

建议每次上传前运行：

```bash
npm run build
npm run lint
```

并确认没有提交 `.env`、`node_modules/`、`dist/`、`tmp/` 等本地文件。
