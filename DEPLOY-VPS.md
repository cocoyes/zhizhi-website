# VPS + PM2 部署

## 本地打包

建议在 Linux、WSL2 或与服务器架构一致的 Docker 环境中执行：

```bash
npm ci
npm run build:node
test -f dist/standalone/server.js
tar -czf zhizhi-release.tar.gz dist/standalone public ecosystem.config.cjs
```

不要上传 `node_modules`。`dist/standalone` 是可独立运行的服务端产物。

## 服务器启动

服务器需要 Node.js 22 或更高版本，以及 PM2：

```bash
mkdir -p /var/www/zhizhi
tar -xzf zhizhi-release.tar.gz -C /var/www/zhizhi
cd /var/www/zhizhi
pm2 start ecosystem.config.cjs
pm2 save
```

应用默认监听 `127.0.0.1:3000`，由 Nginx 反向代理到公网域名。

## 更新版本

上传并解压新产物后执行：

```bash
cd /var/www/zhizhi
pm2 reload ecosystem.config.cjs --update-env
```

## 上线检查

```bash
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:3000/robots.txt
curl -I http://127.0.0.1:3000/sitemap.xml
```
