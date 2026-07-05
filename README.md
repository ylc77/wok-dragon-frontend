# Wok Dragon Frontend

Wok Dragon Express 前台展示项目。项目用于顾客查看菜单、预约、查看地图和联系方式，不包含后台、数据库、支付或在线点餐。

## 技术栈

- React
- Vite
- TypeScript
- CSS
- Vercel 部署

## 当前功能

- 首页：品牌视觉、菜品展示、菜单入口、预约入口、地图入口
- 菜单页：文字菜单、套餐菜单、分类筛选、希腊语 / 英语 / 中文切换
- 预约页：前端预约请求表单、日期和时间选择、提交提示
- 地图页：Google Maps 链接和地址信息
- 联系页：电话、地址、营业时间和联系入口
- 法律页面：Privacy Policy、Terms of Service、Cookie Policy、Contact、Cancellation Policy
- Cookie Banner：基础同意弹窗结构
- 开屏动画：轻量 Canvas 粒子动画

## 运行命令

```bash
npm install
npm run dev
npm run build
npm run lint
```

本地预览默认地址：

```txt
http://127.0.0.1:5173/
```

## 菜单数据

当前菜单已经从用户提供的新菜单照片整理为结构化文字数据：

- 套餐菜单：`src/data/setMenusStructured.ts`
- 单点菜单：`src/data/structuredMenuItems.ts`

菜单页现在只展示文字菜单，不再展示整页菜单照片。原始照片文件保留在 `public/menu-photos/`，仅作为人工核对和后续 OCR 校验资料，不在菜单页面渲染。

## 语言

默认语言为希腊语，顶部可切换：

- 希腊语
- 英语
- 中文

目前页面框架、导航、按钮和主要模块支持三语。菜单菜名的中文翻译会按照片和人工核对继续补全，标记为待核对的价格或菜名需要正式上线前确认。

## 联系信息

店铺信息位于：

```txt
src/data/contact.ts
```

当前营业时间规则：

- 周三休息
- 其他日期：12:00 - 23:30

## 预约说明

当前预约表单是前端演示版本，不会真正发送到手机或 Telegram。上线后如需要 Telegram 通知，可增加 Vercel API Route / Serverless Function，并配置 Telegram Bot Token 与 Chat ID。

## 是否需要 Supabase

当前前台项目不需要 Supabase。只有后续增加以下功能时才建议接入数据库：

- 后台管理预约记录
- 后台编辑菜单
- 会员登录
- 在线点餐
- 订单与支付记录

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
    setMenusStructured.ts
    site.ts
    structuredMenuItems.ts
  routes/
    HomePage.tsx
    MenuPage.tsx
    ReservationPage.tsx
    LocationPage.tsx
    ContactPage.tsx
    LegalPage.tsx
    PrivacyPage.tsx
  styles/
    global.css
  types/
    contact.ts
    menu.ts
    reservation.ts
```

## 部署建议

推荐部署到 Vercel：

1. 推送项目到 GitHub。
2. 在 Vercel 导入 GitHub 仓库。
3. Framework 选择 Vite。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。
6. 如果暂时不启用真实预约通知，保持 `VITE_RESERVATION_API_ENABLED=false`。

## 后续待办

- 继续人工核对所有 OCR 菜名和价格
- 补全菜单中文翻译
- 上线前确认电话、地址、营业时间和法律页面正式文案
- 如需要真实预约通知，接入 Telegram Bot 或邮件通知
- 如需要后台管理，再考虑 Supabase 或其他数据库
