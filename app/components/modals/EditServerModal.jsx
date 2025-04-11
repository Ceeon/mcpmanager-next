'use client';

import { useState, useEffect } from 'react';
import { X, Save, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { validateJSON, formatJSON } from '../../lib/utils';

// 编辑服务器模态框组件
export default function EditServerModal({ isOpen, server, onClose, onUpdateServer }) {
  // 状态管理
  const [serverName, setServerName] = useState('');
  const [serverType, setServerType] = useState('production');
  const [jsonConfig, setJsonConfig] = useState('');
  const [jsonStatus, setJsonStatus] = useState({ isValid: true, message: '' });

  // 当服务器数据变化时，更新表单
  useEffect(() => {
    if (server && isOpen) {
      setServerName(server.name || '');
      setServerType(server.type || 'production');
      
      // 格式化JSON配置
      const config = server.config || {};
      setJsonConfig(formatJSON(JSON.stringify(config)));
      
      setJsonStatus({ isValid: true, message: '' });
    }
  }, [server, isOpen]);

  // 如果没有服务器数据或模态框未打开，不渲染
  if (!server || !isOpen) return null;

  // 验证JSON
  const handleValidateJson = () => {
    if (!jsonConfig.trim()) {
      setJsonStatus({ isValid: false, message: 'JSON配置不能为空' });
      return;
    }
    
    const result = validateJSON(jsonConfig);
    setJsonStatus(result);
  };

  // 更新服务器
  const handleUpdateServer = () => {
    // 验证名称
    if (!serverName.trim()) {
      alert('请输入服务器名称');
      return;
    }
    
    // 验证JSON
    if (jsonConfig.trim()) {
      const result = validateJSON(jsonConfig);
      if (!result.isValid) {
        setJsonStatus(result);
        return;
      }
    }
    
    // 创建更新后的服务器对象
    const updatedServer = {
      ...server,
      name: serverName,
      type: serverType,
      config: jsonConfig ? JSON.parse(jsonConfig) : {},
    };
    
    // 调用回调
    onUpdateServer(updatedServer);
  };

  return (
    <div className="fixed inset-0 bg-foreground/5 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-lg w-full max-w-md shadow-xl animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
        <div className="p-6">
          {/* 模态框标题 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">编辑服务器</h2>
            <button 
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* 表单 */}
          <div className="space-y-4">
            {/* 服务器名称 */}
            <div>
              <label htmlFor="editServerName" className="block text-xs font-medium text-muted mb-1">
                服务器名称
              </label>
              <Input
                id="editServerName"
                placeholder="输入服务器名称"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />
            </div>
            
            {/* 服务器类型 */}
            <div>
              <label htmlFor="editServerType" className="block text-xs font-medium text-muted mb-1">
                服务器类型
              </label>
              <select
                id="editServerType"
                value={serverType}
                onChange={(e) => setServerType(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-gray-50 border border-border text-foreground rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 appearance-none"
              >
                <option value="production">生产环境</option>
                <option value="testing">测试环境</option>
                <option value="development">开发环境</option>
                <option value="backup">备份服务器</option>
              </select>
            </div>
            
            {/* JSON配置 */}
            <div>
              <label htmlFor="editJsonConfig" className="block text-xs font-medium text-muted mb-1">
                JSON 配置
              </label>
              <textarea
                id="editJsonConfig"
                placeholder="请输入 JSON 配置"
                value={jsonConfig}
                onChange={(e) => setJsonConfig(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-border text-foreground rounded-md h-36 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            
            {/* 验证JSON */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handleValidateJson}
                className="bg-gray-100 hover:bg-gray-200 text-foreground"
              >
                <Check className="h-4 w-4 mr-2" />
                验证 JSON
              </Button>
              
              <span className={`text-xs ${jsonStatus.isValid ? 'text-green-500' : 'text-red-500'}`}>
                {jsonStatus.message}
              </span>
            </div>
            
            {/* 更新按钮 */}
            <div className="pt-2">
              <Button 
                onClick={handleUpdateServer}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                更新服务器
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 