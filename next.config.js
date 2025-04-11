/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // 启用静态导出模式
  images: {
    unoptimized: true, // Cloudflare Pages需要这个设置
  },
  // 标记这是一个Cloudflare Pages项目
  experimental: {
    // 简化 outputFileTracingExcludes 配置以避免可能的栈溢出问题
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/**',
        'node_modules/@esbuild/**',
      ],
    },
    // 增加 esmExternals 配置，避免某些模块导致的问题
    esmExternals: 'loose',
  },
  // 增加一个较为宽松的 webpack 配置，以避免一些递归问题
  webpack: (config) => {
    // 提高 webpack 性能选项
    config.performance = {
      hints: false,
    };
    return config;
  },
};

module.exports = nextConfig; 