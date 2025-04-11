'use client';

import { useState } from 'react';
import { Copy, Plus, Monitor } from 'lucide-react';
import { Button } from '../ui/Button';

// 顶部导航栏组件
export default function Header({ onCopyConfig, onAddServer }) {
  const [platform, setPlatform] = useState('windows'); // 默认Windows

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-semibold">MCP</h1>
            </div>
          </div>
          
          {/* 功能按钮组 */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* 平台切换 */}
            <div className="bg-gray-100 rounded-md p-0.5 flex">
              <Button 
                variant={platform === 'windows' ? 'default' : 'ghost'} 
                size="sm"
                className={platform === 'windows' ? '' : 'text-muted hover:text-foreground'} 
                onClick={() => setPlatform('windows')}
              >
                <i className="fab fa-windows mr-2"></i>Windows
              </Button>
              <Button 
                variant={platform === 'mac' ? 'default' : 'ghost'} 
                size="sm"
                className={platform === 'mac' ? '' : 'text-muted hover:text-foreground'} 
                onClick={() => setPlatform('mac')}
              >
                <i className="fab fa-apple mr-2"></i>Mac
              </Button>
            </div>
            
            {/* 复制配置按钮 */}
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-accent/10 hover:bg-accent/20 text-accent border-0"
              onClick={onCopyConfig}
            >
              <Copy className="h-4 w-4 mr-2" />
              复制配置
            </Button>
            
            {/* 添加服务器按钮 */}
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-primary/10 hover:bg-primary/20 text-primary border-0"
              onClick={onAddServer}
            >
              <Plus className="h-4 w-4 mr-2" />
              添加服务器
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 