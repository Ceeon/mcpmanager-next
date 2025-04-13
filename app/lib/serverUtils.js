// 解析JSON配置
export function parseJsonConfig(jsonString) {
  let result = { success: false, config: null, error: null, allServers: null };
  
  try {
    // 尝试解析用户输入的字符串
    let inputValue = jsonString.trim();
    
    // 检查是否是特定格式的JSON（包含mcpServers节点）
    if (inputValue.includes('"mcpServers"')) {
      const fullConfig = JSON.parse(inputValue);
      if (fullConfig.mcpServers) {
        // 保存完整的服务器列表
        result.allServers = fullConfig.mcpServers;
        
        // 如果是包含mcpServers的完整配置，取第一个服务器配置
        const serverName = Object.keys(fullConfig.mcpServers)[0];
        if (serverName) {
          result.config = fullConfig.mcpServers[serverName];
          result.success = true;
          return result;
        }
      }
    }
    
    // 尝试直接解析为单个配置项
    const parsed = JSON.parse(inputValue);
    
    // 如果是简单的配置对象结构
    if (parsed && typeof parsed === 'object') {
      // 确保配置至少包含基本字段
      // 支持url字段或command/args/env字段
      result.config = {};
      
      // 保留url字段（如果存在）
      if (parsed.url) {
        result.config.url = parsed.url;
      }
      
      // 保留传统字段（如果存在）
      result.config.command = parsed.command || null;
      result.config.args = Array.isArray(parsed.args) ? parsed.args : [];
      result.config.env = parsed.env || {};
      
      result.success = true;
    } else {
      result.error = "无法识别的配置格式";
    }
  } catch (e) {
    result.error = e.message;
  }
  
  return result;
}

// 添加新函数：导入完整的MCP服务器配置
export function importFullConfig(jsonString, platform = null) {
  try {
    // 尝试解析用户输入的字符串
    let inputValue = jsonString.trim();
    let servers = [];
    
    // 解析 JSON
    const parsed = JSON.parse(inputValue);
    
    // 检查是否包含 mcpServers 节点
    if (parsed && parsed.mcpServers && typeof parsed.mcpServers === 'object') {
      // 遍历所有服务器配置
      Object.keys(parsed.mcpServers).forEach(serverName => {
        const serverConfig = parsed.mcpServers[serverName];
        
        // 转换配置到指定平台格式（如果指定了平台）
        const finalConfig = platform ? convertConfig(serverConfig, platform) : serverConfig;
        
        // 创建服务器对象
        servers.push({
          id: Date.now() + Math.floor(Math.random() * 1000), // 生成唯一ID
          name: serverName,
          config: finalConfig,
          enabled: true,
          createdAt: new Date().toISOString()
        });
      });
      
      return {
        success: true,
        servers: servers,
        count: servers.length
      };
    }
    
    return {
      success: false,
      error: "配置中没有找到 mcpServers 节点"
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
}

// 转换配置格式
export function convertConfig(config, platform) {
  // 如果配置为空，返回默认值
  if (!config) {
    return { command: null, args: [], env: {} };
  }
  
  // 创建深拷贝，避免修改原始对象
  const newConfig = JSON.parse(JSON.stringify(config));
  
  // 如果配置中包含url字段，直接返回，不做平台转换
  if (newConfig.url) {
    return newConfig;
  }
  
  // 确保配置包含基本字段
  if (!newConfig.command) newConfig.command = null;
  if (!newConfig.args) newConfig.args = [];
  if (!newConfig.env) newConfig.env = {};
  
  try {
    if (platform === 'windows') {
      // Windows 格式转换
      if (newConfig.command && newConfig.command !== 'cmd') {
        const command = newConfig.command;
        const args = [...newConfig.args];
        
        // 构建Windows命令格式
        return {
          command: 'cmd',
          args: ['/c', command, ...args],
          env: newConfig.env
        };
      }
      // 已经是Windows格式，保持不变
      return newConfig;
    } else if (platform === 'mac') {
      // Mac 格式转换
      if (newConfig.command === 'cmd' && newConfig.args && newConfig.args.length >= 2 && newConfig.args[0] === '/c') {
        // 提取Windows格式中的实际命令
        const actualCommand = newConfig.args[1];
        const restArgs = newConfig.args.slice(2);
        
        return {
          command: actualCommand,
          args: restArgs,
          env: newConfig.env
        };
      }
      // 已经是Mac格式，保持不变
      return newConfig;
    }
  } catch (e) {
    console.error('配置转换错误:', e);
  }
  
  // 默认返回原始配置
  return newConfig;
}

// 增强型JSON语法高亮
export function enhancedJsonHighlight(jsonStr) {
  return jsonStr
    .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')  // 键名
    .replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>') // 字符串值
    .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>') // 布尔值
    .replace(/: (null)/g, ': <span class="json-null">$1</span>') // null值
    .replace(/: (-?\d+(\.\d+)?)/g, ': <span class="json-number">$1</span>'); // 数字
}

// 获取服务器配置预览
export function getConfigPreview(config) {
  if (!config || Object.keys(config).length === 0) {
    return '无配置信息';
  }
  
  const commandText = config.command || '无命令';
  const argsText = Array.isArray(config.args) && config.args.length > 0 
    ? `${config.args.length} 参数` 
    : '无参数';
  const envText = config.env && Object.keys(config.env).length > 0 
    ? `${Object.keys(config.env).length} 环境变量` 
    : '无环境变量';
    
  return `${commandText} • ${argsText} • ${envText}`;
}

// 创建用于复制的完整mcpServers格式配置
export function createFullConfig(servers, onlyEnabled = true) {
  // 筛选要导出的服务器
  const filteredServers = onlyEnabled 
    ? servers.filter(s => s.enabled) 
    : servers;
  
  if (filteredServers.length === 0) {
    return null;
  }
  
  // 创建 mcpServers 对象
  const mcpServers = {};
  filteredServers.forEach(server => {
    mcpServers[server.name] = server.config;
  });
  
  // 创建完整的 MCP 配置
  return {
    mcpServers: mcpServers
  };
} 