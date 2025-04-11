import './globals.css';
import { Inter } from 'next/font/google';

// 加载Inter字体
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'MCP 服务器管理',
  description: '简单高效的MCP服务器管理解决方案',
  keywords: '服务器管理, MCP, 配置管理, 监控工具',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
} 