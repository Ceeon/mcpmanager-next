'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

// 提示信息组件
export default function Toast({ show, message, type = 'success', duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // 监听show属性变化，控制显示状态
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // 自动隐藏
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration]);
  
  if (!show && !isVisible) return null;
  
  // 根据类型设置样式
  const styles = {
    success: 'bg-accent/10 text-accent',
    error: 'bg-red-500/10 text-red-500',
    info: 'bg-blue-500/10 text-blue-500',
    warning: 'bg-yellow-500/10 text-yellow-500',
  };
  
  const style = styles[type] || styles.success;
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 px-4 py-2 rounded-md shadow-lg flex items-center text-sm z-50 transition-all duration-300",
        style,
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      {type === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
      {message}
    </div>
  );
} 