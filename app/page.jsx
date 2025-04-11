'use client';

import { useState, useEffect, Fragment } from 'react';
import { Server, Plus, Search, Monitor, Copy, X, Save, Check, Terminal, ToggleLeft, Info, Edit, MoreVertical, ChevronDown, ChevronRight, LayoutGrid, Command, Mail } from 'lucide-react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { 
  parseJsonConfig, 
  convertConfig, 
  getConfigPreview, 
  createFullConfig 
} from './lib/serverUtils';

// 主页组件
export default function Home() {
  // 状态管理
  const [servers, setServers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState('windows');
  const [expandedServerId, setExpandedServerId] = useState(null);
  
  // 模态框状态
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [newServerName, setNewServerName] = useState('');
  const [newServerConfig, setNewServerConfig] = useState('{}');
  const [configError, setConfigError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 从本地存储加载服务器列表和平台设置
  useEffect(() => {
    const savedData = localStorage.getItem('mcpManagerData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData.servers)) {
          setServers(parsedData.servers);
        }
        if (parsedData.platform) {
          setActivePlatform(parsedData.platform);
        }
      } catch (e) {
        console.error('加载服务器数据失败:', e);
        
        // 尝试加载旧版格式
        const savedServers = localStorage.getItem('servers');
        if (savedServers) {
          try {
            const parsedServers = JSON.parse(savedServers);
            setServers(parsedServers);
          } catch (e) {
            console.error('加载旧版服务器数据失败:', e);
          }
        }
      }
    }
  }, []);

  // 保存到本地存储
  const saveToLocalStorage = (serversList) => {
    const data = {
      servers: serversList || servers,
      platform: activePlatform
    };
    localStorage.setItem('mcpManagerData', JSON.stringify(data));
  };

  // 显示提示消息
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 复制所有配置
  const handleCopyConfig = () => {
    const enabledServers = servers.filter(s => s.enabled !== false);
    
    if (enabledServers.length === 0) {
      showToastMessage('没有开启的服务器配置可供复制');
      return;
    }
    
    const fullConfig = createFullConfig(enabledServers);
    const configText = JSON.stringify(fullConfig, null, 2);
    
    navigator.clipboard.writeText(configText)
      .then(() => showToastMessage('配置已复制到剪贴板'))
      .catch(err => showToastMessage('复制失败，请重试'));
  };
  
  // 打开添加服务器模态框
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setNewServerName('');
    setNewServerConfig('{}');
    setConfigError('');
  };
  
  // 关闭添加服务器模态框
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  
  // 验证JSON配置
  const validateConfig = () => {
    try {
      JSON.parse(newServerConfig);
      setConfigError('');
      return true;
    } catch (error) {
      setConfigError(`JSON格式错误: ${error.message}`);
      return false;
    }
  };
  
  // 添加新服务器
  const addServer = () => {
    // 验证表单
    if (!newServerName.trim()) {
      showToastMessage('请输入服务器名称');
      return;
    }
    
    if (!validateConfig()) {
      return;
    }
    
    // 解析和转换配置
    const parseResult = parseJsonConfig(newServerConfig);
    
    if (!parseResult.success) {
      setConfigError(parseResult.error || '无法解析配置');
      return;
    }
    
    // 转换配置为当前平台格式
    const platformConfig = convertConfig(parseResult.config, activePlatform);
    
    // 创建新服务器对象
    const newServer = {
      id: Date.now(),
      name: newServerName.trim(),
      config: platformConfig,
      enabled: true,
      createdAt: new Date().toISOString()
    };
    
    // 更新服务器列表
    const updatedServers = [...servers, newServer];
    setServers(updatedServers);
    
    // 保存到本地存储
    saveToLocalStorage(updatedServers);
    
    // 关闭模态框
    closeAddModal();
    showToastMessage('服务器添加成功');
  };
  
  // 切换服务器启用状态
  const toggleServerEnabled = (id) => {
    const updatedServers = servers.map(server => 
      server.id === id 
        ? { ...server, enabled: !server.enabled }
        : server
    );
    
    setServers(updatedServers);
    saveToLocalStorage(updatedServers);
    
    const server = updatedServers.find(s => s.id === id);
    showToastMessage(`服务器 ${server.name} ${server.enabled ? '已启用' : '已禁用'}`);
  };
  
  // 删除服务器
  const deleteServer = (id) => {
    if (window.confirm('确定要删除此服务器吗？')) {
      const updatedServers = servers.filter(server => server.id !== id);
      setServers(updatedServers);
      saveToLocalStorage(updatedServers);
      showToastMessage('服务器已删除');
    }
  };

  // 复制单个服务器配置
  const copySingleServerConfig = (server) => {
    const serverConfig = { [server.name]: server.config };
    const fullConfig = { mcpServers: serverConfig };
    const configText = JSON.stringify(fullConfig, null, 2);
    
    navigator.clipboard.writeText(configText)
      .then(() => showToastMessage(`服务器 ${server.name} 配置已复制到剪贴板`))
      .catch(err => showToastMessage('复制失败，请重试'));
  };
  
  // 打开详情模态框
  const openDetailModal = (server) => {
    setSelectedServer(server);
    setIsDetailModalOpen(true);
  };
  
  // 关闭详情模态框
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedServer(null);
  };
  
  // 打开编辑模态框
  const openEditModal = (server) => {
    setSelectedServer(server);
    setNewServerName(server.name);
    setNewServerConfig(JSON.stringify(server.config, null, 2));
    setConfigError('');
    setIsEditModalOpen(true);
  };
  
  // 关闭编辑模态框
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedServer(null);
  };
  
  // 保存编辑后的服务器
  const saveEditedServer = () => {
    // 验证表单
    if (!newServerName.trim()) {
      showToastMessage('请输入服务器名称');
      return;
    }
    
    if (!validateConfig()) {
      return;
    }
    
    // 解析和转换配置
    const parseResult = parseJsonConfig(newServerConfig);
    
    if (!parseResult.success) {
      setConfigError(parseResult.error || '无法解析配置');
      return;
    }
    
    // 转换配置为当前平台格式
    const platformConfig = convertConfig(parseResult.config, activePlatform);
    
    // 更新服务器对象
    const updatedServers = servers.map(server => 
      server.id === selectedServer.id 
        ? {
            ...server,
            name: newServerName.trim(),
            config: platformConfig,
            updatedAt: new Date().toISOString()
          }
        : server
    );
    
    // 更新服务器列表
    setServers(updatedServers);
    
    // 保存到本地存储
    saveToLocalStorage(updatedServers);
    
    // 关闭模态框
    closeEditModal();
    showToastMessage('服务器更新成功');
  };

  // 展开/收起服务器配置
  const toggleExpandServer = (id) => {
    setExpandedServerId(expandedServerId === id ? null : id);
  };

  // 切换平台
  const handlePlatformChange = (platform) => {
    if (platform !== activePlatform) {
      setActivePlatform(platform);
      
      // 转换所有服务器配置
      const updatedServers = convertAllConfigs(platform);
      setServers(updatedServers);
      
      // 保存到本地存储
      saveToLocalStorage(updatedServers);
      
      showToastMessage(`平台已切换至 ${platform === 'windows' ? 'Windows' : 'Mac'}`);
    }
  };
  
  // 转换所有服务器配置到指定平台
  const convertAllConfigs = (platform) => {
    return servers.map(server => {
      return {
        ...server,
        config: convertConfig(server.config, platform)
      };
    });
  };

  // 打开联系模态框
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };
  
  // 关闭联系模态框
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo和标题 */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Monitor className="h-8 w-8 text-indigo-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">MCP</h1>
              </div>
            </div>
            
            {/* 右侧功能按钮 */}
            <div className="flex items-center space-x-2">
              {/* 平台切换 */}
              <div className="bg-gray-100 rounded-md hidden sm:flex">
                <button 
                  onClick={() => handlePlatformChange('windows')}
                  className={`px-3 py-2 text-sm font-medium rounded-l-md flex items-center ${
                    activePlatform === 'windows' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4 mr-1.5" />
                  Windows
                </button>
                <button 
                  onClick={() => handlePlatformChange('mac')}
                  className={`px-3 py-2 text-sm font-medium rounded-r-md flex items-center ${
                    activePlatform === 'mac' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Command className="h-4 w-4 mr-1.5" />
                  Mac
                </button>
              </div>
              
              {/* 复制配置按钮 */}
              <button 
                onClick={handleCopyConfig}
                className="hidden sm:inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Copy className="h-4 w-4 mr-2" />
                复制配置
              </button>
              
              {/* 添加服务器按钮 */}
              <button 
                onClick={openAddModal}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                添加服务器
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主要内容 */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题和搜索栏 */}
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">服务器列表</h2>
              <p className="mt-1 text-sm text-gray-500">管理和监控您的所有服务器</p>
            </div>
            
            {/* 搜索栏 */}
            <div className="mt-4 md:mt-0 md:ml-4 relative">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="搜索服务器..."
                />
                {searchQuery && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* 服务器列表或空状态 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {servers.length === 0 ? (
              <div className="py-12">
                <div className="text-center">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 12h14M12 5v14" 
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">尚无服务器</h3>
                  <p className="mt-1 text-sm text-gray-500">点击"添加服务器"按钮开始创建您的第一个服务器配置</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={openAddModal}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      添加服务器
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {servers
                  .filter(server => 
                    server.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(server => (
                  <li key={server.id} className={`px-6 py-4 ${server.enabled === false ? 'bg-gray-50' : ''}`}>
                    <div className="flex items-center">
                      <div 
                        className="flex-shrink-0 cursor-pointer mr-3" 
                        onClick={() => toggleExpandServer(server.id)}
                      >
                        {expandedServerId === server.id ? 
                          <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        }
                      </div>
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full ${server.enabled === false ? 'bg-gray-200' : 'bg-indigo-100'} flex items-center justify-center`}>
                            <Server className={`h-6 w-6 ${server.enabled === false ? 'text-gray-400' : 'text-indigo-600'}`} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 px-4">
                          <div>
                            <p className={`text-sm font-medium ${server.enabled === false ? 'text-gray-500' : 'text-indigo-600'} truncate`}>
                              {server.name}
                            </p>
                            <div className="mt-1 flex items-center flex-wrap gap-2">
                              <span className={`text-xs ${server.enabled === false ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                                <Terminal className="h-3 w-3 mr-1" />
                                {getConfigPreview(server.config)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => toggleServerEnabled(server.id)}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                            server.enabled !== false ? 'bg-indigo-600' : 'bg-gray-200'
                          } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <span
                            className={`${
                              server.enabled !== false ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    {/* 展开的配置信息 */}
                    {expandedServerId === server.id && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="bg-gray-50 p-3 rounded-md mb-3">
                          <div className="mb-2 text-xs text-gray-500 flex items-center">
                            当前显示的是
                            <span className="font-medium flex items-center mx-1">
                              {activePlatform === 'windows' ? (
                                <>
                                  <LayoutGrid className="h-3 w-3 mr-0.5" />
                                  Windows
                                </>
                              ) : (
                                <>
                                  <Command className="h-3 w-3 mr-0.5" />
                                  Mac
                                </>
                              )}
                            </span>
                            平台配置：
                          </div>
                          <pre className="text-xs font-mono text-gray-700 overflow-x-auto whitespace-pre-wrap">
                            {JSON.stringify(server.config, null, 2)}
                          </pre>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(server)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Edit className="h-3 w-3 mr-1.5" />
                            编辑
                          </button>
                          <button
                            onClick={() => copySingleServerConfig(server)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Copy className="h-3 w-3 mr-1.5" />
                            复制
                          </button>
                          <button
                            onClick={() => deleteServer(server.id)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <X className="h-3 w-3 mr-1.5" />
                            删除
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      
      {/* 添加服务器模态框 */}
      <Transition appear show={isAddModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAddModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    <span>添加新服务器</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={closeAddModal}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Title>
                  
                  <div className="mt-4 space-y-4">
                    {/* 服务器名称 */}
                    <div>
                      <label htmlFor="server-name" className="block text-sm font-medium text-gray-700">
                        服务器名称
                      </label>
                      <input
                        type="text"
                        id="server-name"
                        value={newServerName}
                        onChange={(e) => setNewServerName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="输入服务器名称"
                      />
                    </div>
                    
                    {/* JSON配置 */}
                    <div>
                      <label htmlFor="server-config" className="flex justify-between text-sm font-medium text-gray-700">
                        <span>JSON配置</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          当前平台: 
                          {activePlatform === 'windows' ? (
                            <span className="flex items-center ml-1">
                              <LayoutGrid className="h-3 w-3 mr-0.5" />
                              Windows
                            </span>
                          ) : (
                            <span className="flex items-center ml-1">
                              <Command className="h-3 w-3 mr-0.5" />
                              Mac
                            </span>
                          )}
                        </span>
                      </label>
                      <textarea
                        id="server-config"
                        value={newServerConfig}
                        onChange={(e) => setNewServerConfig(e.target.value)}
                        rows={5}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                        placeholder='{"command": "npx", "args": ["-y", "mcprouter"], "env": {"SERVER_KEY": "value"}}'
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {activePlatform === 'windows' ? (
                          <span className="flex items-center">
                            <LayoutGrid className="h-3 w-3 mr-0.5" />
                            在Windows平台上，命令会自动转换为CMD格式
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Command className="h-3 w-3 mr-0.5" />
                            在Mac平台上，命令会以原始格式运行
                          </span>
                        )}
                      </p>
                      {configError && (
                        <p className="mt-1 text-sm text-red-600">{configError}</p>
                      )}
                      <button
                        type="button"
                        onClick={validateConfig}
                        className="mt-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Check className="h-3 w-3 mr-1.5" />
                        验证JSON
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={addServer}
                    >
                      <Save className="h-4 w-4 mr-1.5" />
                      保存服务器
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
      {/* 服务器详情模态框 */}
      <Transition appear show={isDetailModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDetailModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedServer && (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                      >
                        <span>服务器详情</span>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={closeDetailModal}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </Dialog.Title>
                      
                      <div className="mt-4">
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                          <dt className="text-sm font-medium text-gray-500">服务器名称</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedServer.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">状态</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              selectedServer.enabled !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {selectedServer.enabled !== false ? '已启用' : '已禁用'}
                            </span>
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                          <dt className="text-sm font-medium text-gray-500">命令</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                            {selectedServer.config.command || '无'}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">参数</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono">
                            {selectedServer.config.args && selectedServer.config.args.length > 0 
                              ? selectedServer.config.args.join(' ')
                              : '无参数'}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                          <dt className="text-sm font-medium text-gray-500">环境变量</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {selectedServer.config.env && Object.keys(selectedServer.config.env).length > 0 ? (
                              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {Object.entries(selectedServer.config.env).map(([key, value]) => (
                                  <li key={key} className="pl-3 pr-4 py-2 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                      <span className="ml-2 flex-1 w-0 truncate font-mono">
                                        {key} = {value}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-500">无环境变量</span>
                            )}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">创建时间</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {new Date(selectedServer.createdAt).toLocaleString()}
                          </dd>
                        </div>
                      </div>

                      <div className="mt-6 flex space-x-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => {
                            closeDetailModal();
                            openEditModal(selectedServer);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1.5" />
                          编辑
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => {
                            copySingleServerConfig(selectedServer);
                            closeDetailModal();
                          }}
                        >
                          <Copy className="h-4 w-4 mr-1.5" />
                          复制配置
                        </button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
      {/* 编辑服务器模态框 */}
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    <span>编辑服务器</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={closeEditModal}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Title>
                  
                  <div className="mt-4 space-y-4">
                    {/* 服务器名称 */}
                    <div>
                      <label htmlFor="edit-server-name" className="block text-sm font-medium text-gray-700">
                        服务器名称
                      </label>
                      <input
                        type="text"
                        id="edit-server-name"
                        value={newServerName}
                        onChange={(e) => setNewServerName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="输入服务器名称"
                      />
                    </div>
                    
                    {/* JSON配置 */}
                    <div>
                      <label htmlFor="edit-server-config" className="flex justify-between text-sm font-medium text-gray-700">
                        <span>JSON配置</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          当前平台: 
                          {activePlatform === 'windows' ? (
                            <span className="flex items-center ml-1">
                              <LayoutGrid className="h-3 w-3 mr-0.5" />
                              Windows
                            </span>
                          ) : (
                            <span className="flex items-center ml-1">
                              <Command className="h-3 w-3 mr-0.5" />
                              Mac
                            </span>
                          )}
                        </span>
                      </label>
                      <textarea
                        id="edit-server-config"
                        value={newServerConfig}
                        onChange={(e) => setNewServerConfig(e.target.value)}
                        rows={5}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                        placeholder='{"command": "npx", "args": ["-y", "mcprouter"], "env": {"SERVER_KEY": "value"}}'
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {activePlatform === 'windows' ? (
                          <span className="flex items-center">
                            <LayoutGrid className="h-3 w-3 mr-0.5" />
                            在Windows平台上，命令会自动转换为CMD格式
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Command className="h-3 w-3 mr-0.5" />
                            在Mac平台上，命令会以原始格式运行
                          </span>
                        )}
                      </p>
                      {configError && (
                        <p className="mt-1 text-sm text-red-600">{configError}</p>
                      )}
                      <button
                        type="button"
                        onClick={validateConfig}
                        className="mt-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Check className="h-3 w-3 mr-1.5" />
                        验证JSON
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <button
                      type="button"
                      className="inline-flex flex-1 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={saveEditedServer}
                    >
                      <Save className="h-4 w-4 mr-1.5" />
                      保存更改
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={closeEditModal}
                    >
                      取消
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
      {/* 提示消息 */}
      <div
        className={`fixed bottom-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-lg transition-all transform ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {toastMessage}
      </div>
      
      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <button
              onClick={openContactModal}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 mr-1" />
              联系我
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-400">
                MCP 服务器管理工具 • 简单高效的配置解决方案
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* 联系我模态框 */}
      <Transition appear show={isContactModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeContactModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    <span>联系我</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={closeContactModal}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Title>
                  
                  <div className="mt-4 flex flex-col items-center">
                    <div className="text-center mb-4">
                      <p className="text-sm font-medium text-gray-900">扫一扫下面的二维码图案，加我为朋友</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 inline-flex justify-center">
                      <img 
                        src="/qrcode.png" 
                        alt="微信二维码" 
                        className="w-64 h-64 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='14' fill='%236b7280'%3E请放置您的二维码图片%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={closeContactModal}
                    >
                      关闭
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
} 