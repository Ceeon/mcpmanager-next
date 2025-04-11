'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

// 联系按钮组件
export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  // 切换弹出层状态
  const toggleContact = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 浮动联系按钮 */}
      <button 
        onClick={toggleContact}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer z-40 transition-all duration-300"
      >
        <MessageCircle className="h-5 w-5 text-white" />
      </button>

      {/* 联系方式弹出层 */}
      <div 
        className={`fixed right-6 bottom-20 transform ${isOpen ? 'scale-100' : 'scale-0'} origin-bottom-right transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="bg-background border border-border rounded-lg shadow-xl overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <i className="fab fa-weixin text-green-500 text-sm mr-2"></i>
                <span className="text-foreground text-xs font-medium">微信添加好友</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <div className="border border-border rounded-md p-1">
              <img 
                src="b39186a5-5923-452c-a849-7ff4e01d7d05.jpeg" 
                alt="微信二维码" 
                className="w-40 h-40 object-contain"
              />
            </div>
            <p className="text-center text-muted text-xs mt-2">研究MCP中</p>
          </div>
        </div>
      </div>
    </>
  );
} 