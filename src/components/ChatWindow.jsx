import React, { useRef, useEffect } from 'react';
import { Sparkles, Plus, Settings, ChevronDown } from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({
  messages,
  isStreaming,
  onNewChat,
  onOpenSettings,
  currentModelName = 'GPT OSS 120B',
}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#212121] text-[#ececec]">
      {/* Header - Sleek, Minimal & Wide like ChatGPT */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 bg-[#212121] border-b border-neutral-800/80 safe-top select-none window-drag z-10">
        {/* Model Selector Pill */}
        <div className="flex items-center gap-2 window-no-drag">
          <button
            onClick={onOpenSettings}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-neutral-800/80 text-neutral-200 transition-colors cursor-pointer group"
            title="Change AI Model & API Key"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[16px] sm:text-[17px] text-white tracking-tight">
                Light
              </span>
              <span className="text-xs sm:text-[13px] text-neutral-400 font-normal">
                {currentModelName}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 window-no-drag">
          <button
            onClick={onNewChat}
            type="button"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer"
            title="New Chat"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenSettings}
            type="button"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Scroll Area - Full Width & Spacious */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-8 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
            /* Minimalist ChatGPT Style Welcome Canvas (No suggestion clutter) */
            <div className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neutral-800/90 border border-neutral-700/60 flex items-center justify-center mb-5 shadow-sm">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-200" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                How can I help you today?
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-md">
                Ask a question, write code, analyze topics, or brainstorm ideas.
              </p>
            </div>
          ) : (
            /* Message List */
            <div className="flex flex-col w-full">
              {messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id || index}
                  message={msg}
                  isLastAssistant={
                    index === messages.length - 1 && msg.role === 'assistant'
                  }
                  isStreaming={isStreaming}
                />
              ))}
              <div ref={messagesEndRef} className="h-6" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
