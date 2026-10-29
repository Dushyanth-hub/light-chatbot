import React, { useRef, useEffect } from 'react';
import { Sparkles, Plus, Settings, ChevronDown, Code2, Lightbulb, Compass, FileText } from 'lucide-react';
import MessageBubble from './MessageBubble';

const SUGGESTIONS = [
  {
    icon: Code2,
    title: 'Write a script',
    prompt: 'Write a clean JavaScript utility function to format numbers as currency with locale support.',
  },
  {
    icon: Lightbulb,
    title: 'Brainstorm ideas',
    prompt: 'Give me 5 creative, practical project ideas combining AI and mobile web apps.',
  },
  {
    icon: Compass,
    title: 'Explain a concept',
    prompt: 'Explain how Large Language Models predict the next token in simple, intuitive terms.',
  },
  {
    icon: FileText,
    title: 'Draft a message',
    prompt: 'Draft a polite and professional follow-up email after a project discussion.',
  },
];

export default function ChatWindow({
  messages,
  isStreaming,
  onNewChat,
  onOpenSettings,
  onSelectPrompt,
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
      {/* Header - Sleek & Minimal like ChatGPT / Gemini */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#212121] border-b border-neutral-800/80 safe-top select-none window-drag z-10">
        {/* Model Selector Pill */}
        <div className="flex items-center gap-2 window-no-drag">
          <button
            onClick={onOpenSettings}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-neutral-800/80 text-neutral-200 transition-colors cursor-pointer group"
            title="Change AI Model & API Key"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[15px] sm:text-[16px] text-white tracking-tight">
                Light
              </span>
              <span className="text-xs text-neutral-400 font-normal">
                {currentModelName}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 window-no-drag">
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

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto w-full">
          {messages.length === 0 ? (
            /* Gemini / ChatGPT Style Welcome Canvas */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="w-6 h-6 text-neutral-200" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                How can I help you today?
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-md mb-8">
                Ask a question, write code, analyze topics, or brainstorm creative ideas.
              </p>

              {/* Prompt Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-left">
                {SUGGESTIONS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => onSelectPrompt?.(item.prompt)}
                      className="p-3.5 rounded-2xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700/80 transition-all cursor-pointer group flex flex-col gap-1 text-left"
                    >
                      <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
                        <Icon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.prompt}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Message List */
            <div className="flex flex-col">
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
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
