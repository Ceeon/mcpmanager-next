'use client';

// 页脚组件
export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-muted">
            <span>MCP 服务器管理工具</span>
            <span>&bull;</span>
            <span>简单高效的配置解决方案</span>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <a href="#" className="text-muted hover:text-foreground text-xs transition-colors">文档</a>
            <a href="#" className="text-muted hover:text-foreground text-xs transition-colors">反馈</a>
            <a href="#" className="text-muted hover:text-foreground text-xs transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 