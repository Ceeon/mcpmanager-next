/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // 启用静态导出模式
  images: {
    unoptimized: true, // Cloudflare Pages需要这个设置
  },
  // 禁用文件追踪功能，这应该能解决栈溢出问题
  outputFileTracing: false,
  experimental: {
    // 设置为 loose 以避免某些模块问题
    esmExternals: 'loose',
  }
};

module.exports = nextConfig; 