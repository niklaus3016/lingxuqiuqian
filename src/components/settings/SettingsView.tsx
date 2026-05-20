import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Type, Volume2, Trash2, ShieldCheck, Shield, X } from 'lucide-react';
import { Settings } from '../../types';
import { cn } from '../../lib/utils';
import { AgreementModal, PrivacyPolicyContent } from '../agreement/AgreementComponents';
import { storage } from '../../lib/storage';

interface SettingsViewProps {
  onBack: () => void;
  settings: Settings;
  onUpdate: (settings: Partial<Settings>) => void;
}

export default function SettingsView({ onBack, settings, onUpdate }: SettingsViewProps) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleClearCache = () => {
    if (window.confirm('此操作将清除页面缓存和截图记录，确定吗？')) {
      localStorage.clear();
      storage.clearCache();
      alert('已成功清除本地缓存。');
    }
  };

  return (
    <div className="flex flex-col h-full bg-trad-pattern">
      <header className="p-3 flex items-center justify-between border-b border-trad-gold/30 bg-trad-dark sticky top-0 z-10 shadow-lg shadow-black/20">
        <button onClick={onBack} className="p-2 -ml-1 text-trad-yellow active:scale-90 transition-transform z-10">
          <ChevronLeft size={24} />
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-xl font-serif font-black text-trad-yellow tracking-widest [text-shadow:0_0_15px_rgba(234,179,8,0.3)]">
          系统设置
        </h1>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Settings Group: Display */}
        <section className="space-y-4">
          <div className="bg-trad-dark/40 rounded-2xl border border-trad-gold/20 overflow-hidden divide-y divide-trad-gold/10">
            {/* Font Size */}
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-trad-gold/10 text-trad-yellow rounded-lg"><Type size={18} /></div>
                <span className="font-serif font-bold flex-1 text-trad-paper">字体调节</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['small', 'medium', 'large', 'extra'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => onUpdate({ fontSize: size })}
                    className={cn(
                      "py-2 rounded-lg text-[10px] font-bold border transition-all",
                      settings.fontSize === size 
                        ? "bg-trad-gold text-trad-red border-trad-gold shadow-md" 
                        : "bg-trad-dark/30 text-trad-paper/60 border-trad-gold/10"
                    )}
                  >
                    {size === 'small' ? '小' : size === 'medium' ? '中' : size === 'large' ? '大' : '特大'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-trad-gold/10 text-trad-yellow rounded-lg"><Volume2 size={18} /></div>
                 <span className="font-serif font-bold text-trad-paper">音效开关</span>
              </div>
              <button 
                onClick={() => onUpdate({ soundEnabled: !settings.soundEnabled })}
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-colors relative",
                  settings.soundEnabled ? "bg-trad-gold" : "bg-trad-paper/10"
                )}
              >
                <motion.div 
                  animate={{ x: settings.soundEnabled ? 24 : 0 }}
                  className={cn(
                    "w-4 h-4 rounded-full shadow-sm",
                    settings.soundEnabled ? "bg-trad-red" : "bg-trad-paper/40"
                  )} 
                />
              </button>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          {/* Privacy Policy */}
          <button 
            onClick={() => setShowPrivacy(true)}
            className="w-full py-4 bg-trad-dark/30 border border-trad-gold/10 rounded-2xl flex items-center justify-center gap-3 text-trad-yellow/60 font-serif font-bold active:bg-trad-dark transition-colors"
          >
            <Shield size={18} /> 隐私政策
          </button>

          {/* Clear Cache */}
          <button 
            onClick={handleClearCache}
            className="w-full py-4 bg-trad-dark/30 border border-trad-gold/10 rounded-2xl flex items-center justify-center gap-3 text-trad-paper/40 font-serif font-bold active:bg-trad-dark transition-colors opacity-60"
          >
            <Trash2 size={18} /> 清除本地缓存
          </button>
        </div>

        {/* About Section */}
        <section className="space-y-6 pt-4 border-t border-trad-gold/10">
          <div className="relative bg-trad-dark/30 p-5 rounded-2xl border border-trad-gold/10 space-y-4">
            <p className="text-xs text-trad-paper/60 leading-relaxed italic font-serif text-center">
               本应用所提供内容均源自传统文献及算法模拟，仅供娱乐与趣味探索。请以科学价值观为准绳，理性参考。
            </p>
          </div>
        </section>


      </div>

      <AnimatePresence>
        {showPrivacy && (
          <AgreementModal
            onClose={() => setShowPrivacy(false)}
            title="隐私政策"
            content={<PrivacyPolicyContent />}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
