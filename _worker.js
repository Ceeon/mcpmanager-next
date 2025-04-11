export const config = {
  // 为 Cloudflare Workers 启用 Node.js 兼容模式
  compatibility_flags: ["nodejs_compat"]
};

// 将请求转发给原始处理程序
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
}; 