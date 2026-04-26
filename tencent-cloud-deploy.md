# 腾讯云部署笔记

这个项目是 Next.js 应用，并且包含 `/api/digital-twin` 服务端接口。推荐部署到腾讯云轻量应用服务器或 CVM，并使用 Node.js + PM2 + Nginx 运行。

## 1. 服务器建议

- 地域：如果要备案并面向国内访问，选择中国大陆地域，例如广州、上海、北京。
- 系统：Ubuntu 22.04 LTS。
- 配置：个人简历站可以从 2 核 2G 起步。
- 安全组：开放 `22`、`80`、`443` 端口。

如果使用中国大陆服务器和自己的域名访问，需要先在腾讯云完成 ICP 备案或接入备案。

## 2. 安装运行环境

登录服务器后执行：

```bash
sudo apt update
sudo apt install -y git nginx curl

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install -g pm2
```

## 3. 拉取项目

```bash
git clone git@github.com:solareclipse0130/my_resume.git
cd my_resume

npm ci
```

如果服务器无法通过 SSH 拉取 GitHub 仓库，可以改用 HTTPS 地址：

```bash
git clone https://github.com/solareclipse0130/my_resume.git
```

## 4. 构建并启动

```bash
npm run build

cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/static

AIHUBMIX_API_KEY=your_key_here PORT=3000 pm2 start .next/standalone/server.js --name my-resume
pm2 save
pm2 startup
```

把 `your_key_here` 替换为真实的 AIHubMix API Key。如果 `pm2 startup` 输出一条需要 `sudo` 执行的命令，复制并运行它。

后续如果需要修改 API Key：

```bash
AIHUBMIX_API_KEY=new_key_here pm2 restart my-resume --update-env
pm2 save
```

## 5. 配置 Nginx

创建站点配置：

```bash
sudo nano /etc/nginx/sites-available/my-resume
```

写入，把 `your-domain.com` 改成你的域名：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/my-resume /etc/nginx/sites-enabled/my-resume
sudo nginx -t
sudo systemctl reload nginx
```

## 6. 配置 HTTPS

域名备案并解析到服务器后，可以安装 Certbot：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 7. 更新网站

以后更新代码：

```bash
cd ~/my_resume
git pull
npm ci
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/static
pm2 restart my-resume
```

## 8. 常用检查命令

```bash
pm2 status
pm2 logs my-resume
sudo nginx -t
sudo systemctl status nginx
```
