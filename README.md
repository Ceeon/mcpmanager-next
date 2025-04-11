# MCP 服务器管理工具

一个简单高效的服务器配置管理解决方案。

## 功能特点

- 管理多个服务器配置
- 支持Windows和Mac平台格式自动转换
- 本地存储配置信息
- 一键复制配置
- 可视化编辑界面

## 自定义二维码

要添加您的联系二维码，请按照以下步骤操作：

1. 准备一张您的微信二维码图片
2. 将图片重命名为 `qrcode.png`
3. 将图片放置在项目的 `public` 目录下
4. 重新启动应用程序

这样，当用户点击页脚的"联系我"按钮时，将会看到您的二维码。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 构建

```bash
# 构建生产版本
npm run build

# 启动生产版本
npm start
```

## 部署到Cloudflare Pages

本项目已配置为可以部署到Cloudflare Pages。按照以下步骤操作：

1. 安装Wrangler CLI（如果尚未安装）
```bash
npm install -g wrangler
```

2. 登录到您的Cloudflare账户
```bash
wrangler login
```

3. 构建应用程序
```bash
npm run build
```

4. 部署到Cloudflare Pages
```bash
npm run deploy
```

或者直接运行：

```bash
wrangler pages deploy .next
```

部署完成后，您将收到一个URL，可以通过该URL访问您的应用程序。 