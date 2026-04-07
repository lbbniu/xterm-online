# 埋点配置指南

## 已集成的分析工具

本项目已集成以下埋点工具，只需配置相应的跟踪ID即可启用。

---

## 1. Plausible Analytics（推荐）

### 特点
- 轻量级，不影响网站性能
- 隐私友好，无需Cookie同意
- 欧盟服务器，符合GDPR

### 配置步骤
1. 访问 https://plausible.io 注册账户
2. 添加域名 `xterm.online`
3. 获取跟踪代码（已嵌入代码中）
4. 无需额外配置，代码已部署

### 验证
部署后访问 https://plausible.io/xterm.online 查看数据

---

## 2. Google Analytics 4

### 配置步骤
1. 访问 https://analytics.google.com
2. 创建账户和属性
3. 获取测量 ID（格式：`G-XXXXXXXXXX`）
4. 更新 `app/layout.tsx` 中的占位符：

```typescript
// 第28行：替换为实际的GA4测量ID
gtag('config', 'G-XXXXXXXXXX'); // 替换此处
```

5. 第24行也替换相同的ID：
```typescript
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
```

---

## 3. Microsoft Clarity

### 配置步骤
1. 访问 https://clarity.microsoft.com
2. 创建新项目
3. 获取项目 ID（格式：`abcdefghij`）
4. 更新 `app/layout.tsx` 中的占位符：

```typescript
// 第40行：替换为实际的Clarity项目ID
c("script", "abcdefghij"); // 替换此处
```

---

## 配置检查清单

- [ ] Plausible: 注册并添加域名
- [ ] GA4: 替换 `G-XXXXXXXXXX` 为实际测量ID
- [ ] Clarity: 替换 `abcdefghij` 为实际项目ID
- [ ] 重新部署网站
- [ ] 验证各平台数据接收

---

## 埋点事件追踪

项目已自动追踪以下事件（通过 `lib/analytics.ts`）：

| 事件 | 触发时机 |
|------|----------|
| `page_view` | 页面加载 |
| `websocket_connection` | WebSocket连接/断开/错误 |
| `terminal_action` | 清屏/聚焦/失焦 |

### UTM参数自动追踪
所有页面访问自动捕获UTM参数：
- `utm_source` - 流量来源
- `utm_medium` - 媒介类型
- `utm_campaign` - 活动名称

---

## 性能目标

根据Lighthouse优化指南：
- **Performance ≥ 80**
- **LCP < 2.5s**（最大内容绘制）
- **CLS < 0.1**（累积布局偏移）

### 当前优化措施
1. 图片未优化（已配置unoptimized）
2. 字体预加载（已配置preconnect）
3. 脚本异步加载（已配置async/defer）
4. 组件懒加载（xterm.js动态导入）

---

*配置完成后重新部署生效*
