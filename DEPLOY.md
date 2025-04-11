# 部署到Cloudflare Pages指南

本文档提供了将MCP服务器管理工具部署到Cloudflare Pages的详细步骤。

## 准备工作

1. 确保您已经有一个Cloudflare账号。如果没有，可以在[Cloudflare官网](https://dash.cloudflare.com/sign-up)注册一个免费账号。

2. 安装必要的依赖：
```bash
npm install
```

3. 确保您的项目中已经安装了Wrangler：
```bash
npm install --save-dev wrangler@4
```

## 构建应用

在部署之前，需要先构建应用：

```bash
npm run build
```

这会在`.next`目录中生成生产版本的应用文件。

## 登录到Cloudflare

使用Wrangler CLI登录到您的Cloudflare账户：

```bash
npx wrangler login
```

系统会在浏览器中打开Cloudflare登录页面，按照提示进行授权。

## 部署应用

有两种方式可以部署应用：

### 方式1：使用npm脚本

我们已经在`package.json`中添加了部署脚本，可以直接运行：

```bash
npm run deploy
```

### 方式2：使用Wrangler命令

也可以直接使用Wrangler命令进行部署：

```bash
npx wrangler pages deploy .next
```

## 部署过程

执行部署命令后，Wrangler会：

1. 上传`.next`目录中的文件到Cloudflare Pages
2. 构建和部署应用
3. 提供一个URL以访问你的应用

部署完成后，您将看到类似以下信息：

```
✨ Successfully deployed to https://mcpmanager.pages.dev
```

## 自定义域名（可选）

如果您想为您的应用使用自定义域名，可以在Cloudflare Dashboard中进行配置：

1. 登录[Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择"Pages"项目
3. 找到您的项目并点击它
4. 转到"自定义域"选项卡
5. 添加您的域名并按照提示进行配置

## 注意事项

- Cloudflare Pages免费计划提供每天500次部署和每月15万请求的限额，对于个人项目足够使用
- MCP服务器管理工具使用客户端存储（localStorage），即使在Cloudflare上部署，数据也只会存储在用户的浏览器中
- 记得在部署前在`public`目录中放置您的微信二维码图片(`qrcode.png`)，否则联系功能将显示占位图

## 故障排除

如果遇到部署问题，请检查：

1. 确认您是否正确登录了Cloudflare
2. 确认构建成功完成，检查`.next`目录是否存在
3. 检查`wrangler.toml`配置是否正确

如果问题仍然存在，可以参考[Cloudflare Pages文档](https://developers.cloudflare.com/pages/) 