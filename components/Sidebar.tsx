"use client";

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="w-full lg:w-[280px] xl:w-[300px] flex flex-col gap-3 sm:gap-4">
      {/* Sidebar content - hidden on mobile, shown on lg+ */}
      <div className="hidden lg:block bg-slate-800/30 rounded-2xl border border-slate-700/30 p-3 sm:p-4">
        {children}
      </div>

      {/* Quick Info - Always visible but styled for mobile */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-3 sm:p-4">
        <h3 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          使用说明
        </h3>
        <ul className="text-xs sm:text-sm text-slate-400 space-y-1.5 sm:space-y-2">
          <li>• 输入 WebSocket 地址连接</li>
          <li>• 支持 ws:// 和 wss:// 协议</li>
          <li>• 按键自动发送到服务器</li>
          <li>• 支持全屏终端体验</li>
        </ul>
      </div>
    </div>
  );
}
