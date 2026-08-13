# 知枝（Zhizhi）

知枝是一款面向日常生活的 AI 助手。本仓库包含知枝官网、产品下载页、知识指南、隐私政策和用户协议。

项目使用 Next.js App Router、React 19、vinext 和 Vite 构建，同时支持：

- Cloudflare Worker / OpenAI Sites 部署
- Node.js standalone + PM2 自托管部署
- 服务端渲染和静态预生成
- sitemap、robots、canonical 和结构化数据等 SEO 能力

## 环境要求

- Node.js `>= 22.13.0`
- npm
- Cloudflare/Sites 构建需要 Linux、WSL2 或带有 Bash、GNU `timeout` 的 CI 环境
- VPS 部署建议使用 Linux，并安装 PM2 和 Nginx

## 本地开发

安装依赖：

```bash
npm ci
```

启动开发环境：

```bash
npm run dev
```

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动本地开发服务 |
| `npm run build` | 构建 Cloudflare/Sites Worker 版本 |
| `npm run build:node` | 构建 VPS/PM2 使用的 Node standalone 版本 |
| `npm run start` | 本地启动 Cloudflare/Vinext 生产预览 |
| `npm run start:node` | 启动已经构建的 Node standalone 服务 |
| `npm test` | 构建并检查页面渲染及 SEO metadata |
| `npm run lint` | 执行代码检查 |

## VPS + PM2 部署

### 1. 本地构建

建议在 Linux、WSL2 或与服务器环境一致的 Docker 容器中构建，避免 Windows 与 Linux 的原生依赖不兼容。

```bash
npm ci
npm run build:node
```

构建成功后应生成：

```text
dist/standalone/server.js
```

如果没有生成该文件，不要上传不完整的产物，应先检查构建错误。

### 2. 打包上传

```bash
tar -czf zhizhi-release.tar.gz \
  dist/standalone \
  public \
  ecosystem.config.cjs
```

将 `zhizhi-release.tar.gz` 上传到服务器。不需要上传源码和根目录的 `node_modules`。

### 3. 服务器解压

```bash
sudo mkdir -p /var/www/zhizhi
sudo tar -xzf zhizhi-release.tar.gz -C /var/www/zhizhi
sudo chown -R "$USER":"$USER" /var/www/zhizhi
cd /var/www/zhizhi
```

### 4. PM2 启动

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

应用默认监听 `127.0.0.1:3000`。

查看运行状态和日志：

```bash
pm2 status
pm2 logs zhizhi
```

更新版本时，覆盖服务器上的部署产物，然后执行：

```bash
cd /var/www/zhizhi
pm2 reload ecosystem.config.cjs --update-env
```

### 5. Nginx 反向代理

示例配置：

```nginx
server {
    listen 80;
    server_name zhizhi.deepyou.top;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

配置完成后，为正式域名启用 HTTPS。

## Cloudflare / Sites 部署

项目默认的 `npm run build` 会生成 Cloudflare Worker 兼容产物：

```bash
npm ci
npm run build
```

主要产物包括：

```text
dist/server/index.js
dist/.openai/hosting.json
```

Cloudflare/Sites 构建和 Node standalone 构建互相独立：

- 发布到 Cloudflare/Sites 使用 `npm run build`
- 发布到自己的 VPS 使用 `npm run build:node`
- 不要把 Cloudflare Worker 的 `dist/server/index.js` 直接交给 PM2 启动

## SEO

项目目前包含以下 SEO 能力：

- App Router 服务端渲染
- 指南文章静态参数生成
- 页面级 title 和 description
- canonical 地址
- Open Graph metadata
- `robots.txt`
- `sitemap.xml`
- Article、FAQPage 和 SoftwareApplication 结构化数据

正式上线后建议检查：

```bash
curl -I https://zhizhi.deepyou.top/
curl -I https://zhizhi.deepyou.top/robots.txt
curl -I https://zhizhi.deepyou.top/sitemap.xml
```

还应确认页面 HTML 源代码中能够直接看到标题、描述和正文，并将 sitemap 提交到对应的站长平台。

## 项目目录

```text
app/                    页面、路由和 SEO metadata
public/                 图片及静态资源
worker/                 Cloudflare Worker 入口
scripts/                构建和校验脚本
vite.config.ts          Cloudflare/Sites 构建配置
vite.node.config.ts     Node standalone 构建配置
ecosystem.config.cjs    PM2 配置
.openai/hosting.json    Sites 托管配置
```

更精简的 VPS 操作说明也可以查看 [DEPLOY-VPS.md](./DEPLOY-VPS.md)。
