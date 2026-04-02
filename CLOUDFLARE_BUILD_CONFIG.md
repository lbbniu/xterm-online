# XTerm Online - Cloudflare Pages 构建配置参考

## 构建配置参数

### 基础设置
- **生产分支**: `master`
- **构建命令**: `npm ci && npm run build`
- **输出目录**: `out`
- **根目录**: `/`

### 环境变量
```
NODE_VERSION=22
```

### 构建命令详解
```bash
# 安装依赖（使用 package-lock.json）
npm ci

# 构建 Next.js 项目
npm run build
```

### 输出目录结构
```
out/
├── index.html
├── _next/
│   └── static/
├── icon.svg
└── ...
```

## 注意事项

1. **package.json** 中已配置:
   ```json
   "scripts": {
     "build": "next build"
   }
   ```

2. **next.config.ts** 已配置静态导出:
   ```typescript
   output: 'export',
   distDir: 'out'
   ```

3. **Node.js 版本**: 建议使用 18.x 或 20.x 或 22.x

## 部署流程

1. 开发者推送代码到 `master` 分支
2. Cloudflare Pages 自动检测变更
3. 执行构建命令
4. 部署到生产环境
5. 自动更新 https://xterm.online
