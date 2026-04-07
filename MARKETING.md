# XTerm Online - 运营冷启动清单

## 文章参考
《OpenClaw 做站最后阶段：4 个 AI Agent 接力，从 QA 验收到外链分发一天搞定》
https://mp.weixin.qq.com/s/SY0uKqMGWSfIZGcNK74dbg

---

## ✅ 已完成（代码层面）

### 1. SEO + GEO 基础
- [x] Title 优化（≤60字符）
- [x] Meta description（120-155字符）
- [x] Canonical 链接
- [x] JSON-LD 结构化数据（Organization + WebSite + SoftwareApplication）
- [x] llms.txt 创建
- [x] sitemap.ts / robots.ts
- [x] GEO 前150词定义

### 2. QA 验收（代码层面）
- [x] 响应式设计（6个断点：1440/1280/768/390/360/320px）
- [x] 组件化重构
- [x] 类型安全
- [x] ARIA 可访问性
- [x] 埋点代码（Plausible/GA4/Clarity）
- [x] UTM 参数追踪

### 3. 自动部署
- [x] GitHub Actions 工作流（deploy.yml）

---

## ⏳ 待主公手动完成

### 4. 埋点配置（需注册账户）

#### Plausible Analytics
- [ ] 注册 https://plausible.io
- [ ] 添加域名 `xterm.online`
- [ ] 获取跟踪代码（已嵌入 layout.tsx）
- [ ] 验证数据接收

#### Google Analytics 4
- [ ] 注册 https://analytics.google.com
- [ ] 创建属性 `XTerm Online`
- [ ] 获取测量 ID（格式：G-XXXXXXXXXX）
- [ ] 替换 layout.tsx 中的 `G-XXXXXXXXXX`

#### Microsoft Clarity
- [ ] 注册 https://clarity.microsoft.com
- [ ] 添加项目
- [ ] 获取项目 ID（格式：XXXXXXXXXX）
- [ ] 替换 layout.tsx 中的 `XXXXXXXXXX`

### 5. 搜索引擎提交

#### Google Search Console
- [ ] 访问 https://search.google.com/search-console
- [ ] 添加属性 `xterm.online`
- [ ] 验证所有权（DNS 或 HTML 文件）
- [ ] 提交 sitemap: `https://xterm.online/sitemap.xml`

#### Bing Webmaster Tools
- [ ] 访问 https://www.bing.com/webmasters
- [ ] 添加站点
- [ ] 验证所有权
- [ ] 提交 sitemap
> ⚠️ **重要**：ChatGPT Search 使用 Bing 索引，必须提交！

### 6. 外链冷启动（GitHub Awesome Lists）

#### 目标仓库清单
搜索关键词：`awesome-web-terminal`, `awesome-terminal`, `awesome-developer-tools`

| 仓库 | Star数 | 状态 | PR链接 |
|------|--------|------|--------|
| [ ] awesome-web-terminal | >500 | 待提交 | |
| [ ] awesome-terminal | >500 | 待提交 | |
| [ ] awesome-developer-tools | >1000 | 待提交 | |

#### 提交格式
```markdown
- [XTerm Online](https://xterm.online) - Professional web-based terminal using xterm.js with WebSocket support. Free, no signup required.
```

#### 注意事项
- 每天最多 3 个 PR
- 描述客观，不写"best/最强"
- 格式与现有条目保持一致
- 被拒不纠缠，换下一个

### 7. 运营冷启动

#### 技术周刊投稿

| 周刊 | 投稿方式 | 状态 | 链接 |
|------|----------|------|------|
| [ ] 阮一峰科技爱好者周刊 | GitHub Issue | 待投稿 | https://github.com/ruanyf/weekly |
| [ ] HelloGitHub 月刊 | GitHub Issue | 待投稿 | |
| [ ] 独立开发变现周刊 | 邮件/表单 | 待投稿 | |
| [ ] TLDR Newsletter | 表单 | 待投稿 | https://tldr.tech/newsletters |

#### 社区发帖

| 社区 | 平台 | 状态 | UTM参数 |
|------|------|------|---------|
| [ ] Show HN | Hacker News | 待发帖 | `?utm_source=hackernews&utm_medium=post` |
| [ ] r/webdev | Reddit | 待发帖 | `?utm_source=reddit&utm_medium=post` |
| [ ] V2EX | 中文社区 | 待发帖 | `?utm_source=v2ex&utm_medium=post` |

#### AI 工具目录站（免费）

| 平台 | 状态 | 链接 |
|------|------|------|
| [ ] BetaList | 待提交 | https://betalist.com |
| [ ] AlternativeTo | 待提交 | https://alternativeto.net |
| [ ] Indie Hackers | 待提交 | https://indiehackers.com |

---

## 📊 数据追踪

### UTM 参数规范
```
https://xterm.online/?utm_source={来源}&utm_medium={媒介}&utm_campaign={活动}
```

### 示例
- 周刊投稿：`?utm_source=ruanyf&utm_medium=newsletter`
- Hacker News：`?utm_source=hackernews&utm_medium=post&utm_campaign=launch`
- Reddit：`?utm_source=reddit&utm_medium=post&utm_campaign=launch`

### Day 7 必须回答的 5 个问题
1. 日均 UV 多少？（< 10 说明分发还不够）
2. 最大流量来源是什么？
3. 哪个页面跳出率最高？
4. 有没有人真正用了工具？
5. Clarity 热力图发现了什么？

---

## 🔧 技术配置

### 替换占位符
在 `app/layout.tsx` 中替换以下占位符：
- `G-XXXXXXXXXX` → 你的 GA4 测量 ID
- `XXXXXXXXXX` → 你的 Clarity 项目 ID

### 环境变量（GitHub Secrets）
在 GitHub 仓库 Settings → Secrets 中添加：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

*最后更新：2026-04-07*
