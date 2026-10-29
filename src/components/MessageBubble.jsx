import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, AlertCircle, Copy, Check, Terminal } from 'lucide-react';

// Modern ChatGPT-style Code block with Copy button
function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy code', e);
    }
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-neutral-800 bg-[#0d0d0d] shadow-md group">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-400 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neutral-400" />
          <span className="font-mono text-[12px] uppercase tracking-wider text-neutral-300">
            {language || 'code'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition active:scale-95 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-4 overflow-x-auto text-[13px] sm:text-[14px] leading-relaxed font-mono text-neutral-100">
        <code>{codeString}</code>
      </pre>
    </div>
  );
}

export default function MessageBubble({ message, isLastAssistant, isStreaming }) {
  const isUser = message.role === 'user';
  const isError = message.isError;
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (e) {
      console.error('Failed to copy message', e);
    }
  };

  if (isUser) {
    // Sleek ChatGPT / Gemini style user bubble
    return (
      <div className="flex w-full justify-end my-3 sm:my-4 px-2">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-[24px] px-5 py-3 bg-[#2f2f2f] text-[#ececec] text-[15px] sm:text-[16px] leading-[1.6] shadow-sm border border-white/5 break-words whitespace-pre-wrap select-text">
          {message.content}
        </div>
      </div>
    );
  }

  // Assistant response - Clean, spacious, and unboxed like ChatGPT / Gemini
  return (
    <div className="group flex w-full my-4 sm:my-6 px-2 text-[#d1d5db]">
      <div className="flex w-full gap-3 sm:gap-4">
        {/* Subtle AI Icon Avatar */}
        <div className="flex-shrink-0 pt-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-neutral-200 shadow-sm">
            {isError ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-neutral-200" />
            )}
          </div>
        </div>

        {/* Assistant Content Canvas */}
        <div className="flex-1 min-w-0">
          {isError ? (
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40 text-red-300 text-sm">
              {message.content}
            </div>
          ) : (
            <div className="text-[15px] sm:text-[16px] leading-[1.75] text-[#d1d5db] font-normal tracking-normal select-text">
              <ReactMarkdown
                components={{
                  // Code block rendering
                  code({ node, inline, className, children, ...props }) {
                    if (!inline) {
                      return <CodeBlock className={className}>{children}</CodeBlock>;
                    }
                    return (
                      <code
                        className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 font-mono text-[13px] border border-neutral-700/60"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  // Headings with clean ChatGPT/Gemini scale & margins
                  h1({ children }) {
                    return (
                      <h1 className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3 tracking-tight border-b border-neutral-800/60 pb-2">
                        {children}
                      </h1>
                    );
                  },
                  h2({ children }) {
                    return (
                      <h2 className="text-lg sm:text-xl font-semibold text-white mt-5 mb-2.5 tracking-tight">
                        {children}
                      </h2>
                    );
                  },
                  h3({ children }) {
                    return (
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-100 mt-4 mb-2">
                        {children}
                      </h3>
                    );
                  },
                  // Clean paragraph spacing
                  p({ children }) {
                    return <p className="my-3 leading-[1.75] text-[#d1d5db]">{children}</p>;
                  },
                  // Neatly indented bullet lists with proper marker spacing
                  ul({ children }) {
                    return (
                      <ul className="my-3.5 space-y-2 pl-6 list-disc marker:text-neutral-400 text-[#d1d5db]">
                        {children}
                      </ul>
                    );
                  },
                  ol({ children }) {
                    return (
                      <ol className="my-3.5 space-y-2 pl-6 list-decimal marker:text-neutral-400 text-[#d1d5db]">
                        {children}
                      </ol>
                    );
                  },
                  li({ children }) {
                    return <li className="pl-1 leading-[1.7] text-[#d1d5db]">{children}</li>;
                  },
                  strong({ children }) {
                    return <strong className="font-semibold text-white">{children}</strong>;
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="my-4 pl-4 border-l-2 border-neutral-600 text-neutral-400 italic">
                        {children}
                      </blockquote>
                    );
                  },
                  hr() {
                    return <hr className="my-6 border-neutral-800" />;
                  },
                  table({ children }) {
                    return (
                      <div className="my-4 overflow-x-auto rounded-xl border border-neutral-800">
                        <table className="w-full text-left text-sm border-collapse">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  thead({ children }) {
                    return <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-200">{children}</thead>;
                  },
                  th({ children }) {
                    return <th className="px-3.5 py-2.5 font-semibold text-neutral-200">{children}</th>;
                  },
                  td({ children }) {
                    return <td className="px-3.5 py-2.5 border-b border-neutral-800 text-neutral-300">{children}</td>;
                  },
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>

              {/* Streaming Cursor */}
              {isLastAssistant && isStreaming && (
                <span className="cursor-blink inline-block w-1.5 h-4 ml-1 bg-neutral-300 rounded-sm translate-y-0.5" />
              )}
            </div>
          )}

          {/* Action Toolbar below assistant message */}
          {!isError && message.content && (
            <div className="flex items-center gap-2 mt-3 pt-1 text-xs">
              <button
                type="button"
                onClick={handleCopyMessage}
                title="Copy message"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition active:scale-95 cursor-pointer"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
