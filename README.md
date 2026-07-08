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

## 法律信息交付配置

法律页面继续使用轻量配置文件模式，不需要后台或数据库。给下一个餐馆客户交付时，优先只修改：

```txt
src/data/legal.ts
```

需要替换或确认的内容包括：

- 商家名
- 法律主体名
- 地址
- 电话
- 邮箱
- VAT / AFM
- GEMI
- 实际启用的第三方服务
- 预约取消规则
- 支付和退款说明
- 过敏原和菜单供应说明
- 数据保留说明
- 最后更新时间

如果某类第三方服务没有启用，例如在线支付、网站分析、AI 服务或预约通知服务，对应数组保持为空，法律页面不会显示该服务类别。

正式上线前必须向餐厅负责人确认并填写：

- 法律主体完整名称（公司或个体经营者登记名称）
- 对外经营名称
- 营业地址
- VAT / AFM 税号
- GEMI 商业登记号（如适用）
- 对外联系电话和长期有效的联系邮箱
- 隐私请求邮箱，以及数据控制者名称
- 是否指定数据保护官（DPO）；没有则保持为空
- 预约资料会发送给谁、通过什么服务发送
- 预约资料通常保留多久
- 取消、迟到及座位保留规则
- 餐厅书面过敏原资料的获取方式
- 是否启用 Google Maps、统计分析、广告追踪或在线支付
- 正式域名和法律页面最后更新时间

空字段不会显示在法律页面，但法律主体、有效邮箱、VAT / AFM、GEMI（如适用）及明确的数据保留规则不应在正式交付时继续留空。法律模板用于基础网站合规，不替代希腊律师、会计师或数据保护专业人士针对该经营主体的审核。

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
