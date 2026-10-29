import React, { useState, useEffect } from 'react';
import { X, Key, Cpu, ExternalLink, Eye, EyeOff, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { AVAILABLE_MODELS, DEFAULT_MODEL, getApiKey } from '../services/groq';

export default function SettingsModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [showKey, setShowKey] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem('groq_api_key') || '');
      setModel(localStorage.getItem('groq_model') || DEFAULT_MODEL);
      setSavedAlert(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentEffectiveKey = apiKey.trim() || getApiKey();
  const hasKey = Boolean(currentEffectiveKey);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('groq_api_key', apiKey.trim());
    localStorage.setItem('groq_model', model);
    setSavedAlert(true);
    setTimeout(() => {
      onSave?.();
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
      <div className="w-full max-w-lg bg-[#1e1e1e] border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-2xl text-neutral-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-neutral-200" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                Settings
              </h2>
              <p className="text-xs text-neutral-400">Manage AI model & Groq API key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-5 select-text">
          {/* Status banner */}
          <div
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs border ${
              hasKey
                ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                : 'bg-amber-950/20 border-amber-800/40 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {hasKey ? 'Groq API Key connected' : 'No API Key configured'}
              </span>
            </div>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-black/40">
              {hasKey ? 'Active' : 'Missing'}
            </span>
          </div>

          {/* Groq API Key Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-neutral-400" />
                Groq API Key
              </label>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-medium transition"
              >
                Get Free Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full bg-[#141414] border border-neutral-800 focus:border-neutral-600 rounded-xl px-3.5 py-2.5 pr-10 text-sm font-mono text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 cursor-pointer"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-neutral-500">
              Your key stays safely stored in local storage on your device.
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-neutral-400" />
              Default Model
            </label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#141414] border border-neutral-800 focus:border-neutral-600 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none transition-colors cursor-pointer"
              >
                {AVAILABLE_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              {savedAlert ? (
                <>
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  Saved
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
