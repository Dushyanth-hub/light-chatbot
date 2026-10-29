import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Square } from 'lucide-react';

export default function ChatInput({
  onSendMessage,
  onStopStreaming,
  isStreaming,
  disabled,
}) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (isStreaming) {
      onStopStreaming?.();
      return;
    }

    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <div className="w-full bg-[#212121] px-4 sm:px-6 pt-1 pb-3 sm:pb-4 safe-bottom select-none">
      <div className="max-w-3xl mx-auto w-full">
        {/* Floating Input Pill - ChatGPT / Gemini style */}
        <div className="relative flex items-end gap-2 bg-[#2f2f2f] border border-white/10 focus-within:border-white/20 rounded-[26px] px-3.5 sm:px-4 py-2 transition-all shadow-md">
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isStreaming
                ? "Light is thinking..."
                : "Message Light..."
            }
            rows={1}
            disabled={disabled && !isStreaming}
            className="flex-1 max-h-48 bg-transparent text-[#ececec] placeholder-neutral-400 text-[15px] sm:text-[16px] leading-[1.5] resize-none focus:outline-none py-1.5 scrollbar-thin select-text"
          />

          {/* Send / Stop Circular Button */}
          {isStreaming ? (
            <button
              type="button"
              onClick={onStopStreaming}
              title="Stop generating"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black hover:bg-neutral-200 transition-all flex items-center justify-center cursor-pointer flex-shrink-0 self-end mb-0.5"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSend}
              title="Send message"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all flex items-center justify-center flex-shrink-0 self-end mb-0.5 cursor-pointer ${
                canSend
                  ? 'bg-white text-black hover:bg-neutral-200 active:scale-95 shadow-sm'
                  : 'bg-[#494949] text-[#8e8e8e] cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Small subtle footer disclaimer */}
        <p className="text-[11px] text-center text-neutral-400 mt-2 select-none">
          Light can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}
