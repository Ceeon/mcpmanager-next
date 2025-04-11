export default function Home() {
  // 添加调试信息
  console.log("测试部署更新: " + new Date().toISOString());
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">MCP 服务器管理工具</h1>
      <p className="text-xl">欢迎使用MCP服务器管理工具</p>
    </main>
  );
} 