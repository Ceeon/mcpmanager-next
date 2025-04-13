'use client';

import { useState } from 'react';
import { X, Save, Check, AlertCircle, Upload } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { parseJsonConfig, importFullConfig } from '../../lib/serverUtils';

// 添加服务器模态框组件
export default function AddServerModal({ isOpen, onClose, onAddServer, onBatchImport, currentPlatform }) {
  // 状态管理
  const [serverName, setServerName] = useState('');
  const [jsonConfig, setJsonConfig] = useState('');
  const [jsonStatus, setJsonStatus] = useState({ isValid: true, message: '' });
  const [importMode, setImportMode] = useState(false); // 添加导入模式状态

  // 重置表单
  const resetForm = () => {
    setServerName('');
    setJsonConfig('');
    setJsonStatus({ isValid: true, message: '' });
    setImportMode(false);
  };

  // 关闭模态框
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // 验证JSON
  const validateJSON = () => {
    try {
      if (!jsonConfig.trim()) {
        return { isValid: true, message: '配置为空，将使用默认配置' };
      }
      
      JSON.parse(jsonConfig);
      return { isValid: true, message: 'JSON格式有效' };
    } catch (e) {
      return { isValid: false, message: `JSON格式无效: ${e.message}` };
    }
  };

  // 验证JSON按钮点击
  const handleValidateJson = () => {
    const result = validateJSON();
    setJsonStatus(result);
  };

  // 保存服务器
  const handleSaveServer = () => {
    // 验证名称
    if (!serverName.trim()) {
      alert('请输入服务器名称');
      return;
    }
    
    // 验证JSON
    if (jsonConfig.trim()) {
      const result = validateJSON();
      if (!result.isValid) {
        setJsonStatus(result);
        return;
      }
    }
    
    // 解析JSON配置
    const parseResult = parseJsonConfig(jsonConfig);
    if (!parseResult.success) {
      setJsonStatus({ isValid: false, message: parseResult.error || '无法解析配置' });
      return;
    }

    // 创建服务器对象
    const newServer = {
      name: serverName,
      config: parseResult.config, // 使用parseJsonConfig解析后的配置
    };
    
    // 调用回调
    onAddServer(newServer);
    
    // 重置表单并关闭模态框
    resetForm();
    handleClose();
  };

  // 批量导入服务器
  const handleBatchImport = () => {
    if (!jsonConfig.trim()) {
      setJsonStatus({ isValid: false, message: '请输入 MCP 服务器配置' });
      return;
    }
    
    try {
      // 使用服务器工具导入配置，传入当前平台
      const result = importFullConfig(jsonConfig, currentPlatform);
      
      if (!result.success) {
        setJsonStatus({ isValid: false, message: result.error });
        return;
      }
      
      // 调用批量导入回调
      if (onBatchImport) {
        onBatchImport(result.servers);
        
        // 显示成功消息
        setJsonStatus({ 
          isValid: true, 
          message: `成功导入 ${result.count} 个服务器配置` 
        });
        
        // 延迟关闭模态框
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (e) {
      setJsonStatus({ isValid: false, message: e.message });
    }
  };

  // 切换模式
  const toggleMode = () => {
    setImportMode(!importMode);
    setJsonConfig('');
    setJsonStatus({ isValid: true, message: '' });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={(value) => {
          // 只在显式点击背景时关闭
          if (!document.activeElement || 
              document.activeElement.tagName === 'BODY' || 
              document.activeElement.classList.contains('fixed')) {
            handleClose();
          }
        }}
      >
        {/* 背景遮罩 */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel onClick={(e) => e.stopPropagation()} className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* 模态框标题 */}
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-lg font-semibold">
                    {importMode ? '导入服务器配置' : '添加服务器'}
                  </Dialog.Title>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {/* 模式切换 */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMode();
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {importMode ? '切换到添加单个服务器' : '切换到批量导入模式'}
                  </button>
                </div>
                
                {/* 表单 */}
                <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                  {!importMode && (
                    <>
                      {/* 服务器名称 */}
                      <div>
                        <label htmlFor="serverName" className="block text-xs font-medium text-muted mb-1">
                          服务器名称
                        </label>
                        <Input
                          id="serverName"
                          placeholder="输入服务器名称"
                          value={serverName}
                          onChange={(e) => setServerName(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </>
                  )}
                  
                  {/* JSON配置 */}
                  <div>
                    <label htmlFor="jsonConfig" className="block text-xs font-medium text-muted mb-1">
                      {importMode 
                        ? 'MCP 服务器配置 (mcpServers格式)' 
                        : 'JSON 配置'}
                    </label>
                    <textarea
                      id="jsonConfig"
                      placeholder={importMode 
                        ? '请输入完整的 MCP 服务器配置 JSON，包含 mcpServers 节点' 
                        : '请输入 JSON 配置'}
                      value={jsonConfig}
                      onChange={(e) => setJsonConfig(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full px-3 py-2 bg-gray-50 border border-border text-foreground rounded-md h-36 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                  
                  {/* 验证JSON */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleValidateJson();
                      }}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      验证 JSON
                    </button>
                    
                    <span className={`text-xs ${jsonStatus.isValid ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      {jsonStatus.isValid ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {jsonStatus.message}
                    </span>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="pt-4 flex space-x-2">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      取消
                    </button>

                    {importMode ? (
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBatchImport();
                        }}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        确定导入
                      </button>
                    ) : (
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveServer();
                        }}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        确定添加
                      </button>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 