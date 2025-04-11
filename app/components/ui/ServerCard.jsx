'use client';

import { useState } from 'react';
import { Edit, Trash2, Server, ExternalLink, ChevronDown } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

// 服务器类型映射
const SERVER_TYPES = {
  production: '生产环境',
  testing: '测试环境',
  development: '开发环境',
  backup: '备份服务器'
};

// 服务器状态组件
function ServerStatusBadge({ status }) {
  const statusConfig = {
    online: {
      color: 'bg-green-500',
      text: '在线',
      bgColor: 'bg-green-500/10', 
      textColor: 'text-green-500'
    },
    offline: {
      color: 'bg-red-500',
      text: '离线',
      bgColor: 'bg-red-500/10', 
      textColor: 'text-red-500'
    },
    maintenance: {
      color: 'bg-yellow-500',
      text: '维护中',
      bgColor: 'bg-yellow-500/10', 
      textColor: 'text-yellow-500'
    }
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <div className="flex items-center">
      <div className={cn("w-2 h-2 rounded-full mr-2", config.color)}></div>
      <span className={cn("text-xs px-2 py-1 rounded-full", config.bgColor, config.textColor)}>
        {config.text}
      </span>
    </div>
  );
}

// 服务器卡片组件
export default function ServerCard({ server, onEdit, onDelete }) {
  // 随机状态用于演示
  const [serverStatus] = useState(() => {
    const statuses = ['online', 'offline', 'maintenance'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  });
  
  // 格式化服务器配置为可读字符串
  const formatConfig = (config) => {
    if (!config || Object.keys(config).length === 0) return '无配置信息';
    return JSON.stringify(config, null, 2);
  };

  // 配置项预览
  const getConfigPreview = (config) => {
    if (!config || Object.keys(config).length === 0) return '无配置项';
    const keys = Object.keys(config);
    if (keys.length === 0) return '无配置项';
    return `${keys.length}个配置项: ${keys.slice(0, 2).join(', ')}${keys.length > 2 ? '...' : ''}`;
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden animate-fade-in">
      <div className="card-body p-5">
        {/* 卡片标题和状态指示器 */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="card-title text-lg font-semibold">{server.name || '未命名服务器'}</h3>
            <div className="text-xs text-muted mt-1 flex items-center">
              <Server className="h-3 w-3 mr-1" />
              <span>{SERVER_TYPES[server.type] || '未知类型'}</span>
            </div>
          </div>
          <ServerStatusBadge status={serverStatus} />
        </div>
        
        {/* 服务器信息 */}
        <div className="py-1">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-muted">ID: {server.id}</div>
            <div className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {serverStatus === 'online' ? '已连接' : '未连接'}
            </div>
          </div>
          
          {/* 配置信息折叠面板 */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-primary/5 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
                  <span>配置详情</span>
                  <ChevronDown
                    className={`${open ? 'rotate-180 transform' : ''} h-4 w-4 transition-transform duration-200`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="mt-2 bg-gray-50 rounded-md p-3 text-xs overflow-auto">
                    <div className="font-mono overflow-x-auto whitespace-pre max-h-36 scrollbar-thin scrollbar-thumb-gray-300">
                      {formatConfig(server.config)}
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          
          <div className="text-xs mt-3 text-muted">
            {getConfigPreview(server.config)}
          </div>
        </div>
        
        {/* 卡片底部操作按钮 */}
        <div className="card-actions justify-end mt-3">
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary"
          >
            <Edit className="h-4 w-4 mr-1" />
            编辑
          </Button>
          <Button 
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-red-500"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            删除
          </Button>
        </div>
      </div>
    </div>
  );
} 