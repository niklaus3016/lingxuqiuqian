import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Info } from 'lucide-react';
import fortunesData from '../../data/fortunes.json';
import { Settings, FortuneCategory, FortuneItem } from '../../types';
import { cn } from '../../lib/utils';
import FortuneDraw from './FortuneDraw';
import FortuneDetail from './FortuneDetail';

interface FortuneHomeProps {
  onBack: () => void;
  settings: Settings;
}

export default function FortuneHome({ onBack, settings }: FortuneHomeProps) {
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [result, setResult] = useState<FortuneItem | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<FortuneCategory | null>(null);

  const handleCategorySelect = (category: any) => {
    setPendingCategory(category);
    setShowConfirm(true);
  };

  const startDraw = () => {
    setSelectedCategory(pendingCategory);
    setShowConfirm(false);
    setDrawing(true);
  };

  const handleDrawComplete = (item: FortuneItem) => {
    setResult(item);
    setDrawing(false);
  };

  const handleReset = () => {
    setResult(null);
    setDrawing(true);
  };

  const handleBackToSelect = () => {
    setResult(null);
    setDrawing(false);
    setSelectedCategory(null);
  };

  return (
    <div className="flex flex-col h-full bg-trad-pattern">
      <header className="p-3 flex items-center justify-between border-b border-trad-gold/30 bg-trad-dark sticky top-0 z-10 shadow-lg shadow-black/20">
        <button onClick={onBack} className="p-2 -ml-1 text-trad-yellow active:scale-90 transition-transform z-10">
          <ChevronLeft size={24} />
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-xl font-serif font-black text-trad-yellow tracking-[0.2em] [text-shadow:0_0_15px_rgba(234,179,8,0.3)]">
          抽签祈福
        </h1>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {!selectedCategory && (
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-trad-gold/0 via-trad-gold/30 to-trad-gold/0 blur-[2px] rounded-xl" />
              <div className="relative bg-trad-dark/60 p-4 rounded-xl border border-trad-gold/30 flex flex-col items-center text-center shadow-xl">
                <p className="text-base text-trad-yellow font-serif font-bold leading-relaxed tracking-wide">
                  诚心祈愿 · 摇晃签筒
                </p>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-trad-gold/40 to-transparent my-1.5" />
                <p className="text-[10px] text-trad-paper/40 font-sans">
                  请根据心中所求选择合适的签筒
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {(fortunesData.categories as any[]).map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategorySelect(cat)}
                  className="p-4 bg-trad-dark/40 rounded-2xl border border-trad-gold/20 flex flex-col gap-2 relative overflow-hidden text-left aspect-[1/1.2] justify-end group shadow-lg shadow-black/20"
                >
                  <div className="absolute -top-4 -right-4 text-trad-gold/5 text-6xl group-hover:scale-110 transition-transform duration-500 font-serif pointer-events-none">
                    {cat.name.substring(0, 1)}
                  </div>
                  
                  <div className="text-2xl mb-auto">
                    {cat.id === 'marriage' ? '🏮' : cat.id === 'career' ? '💰' : cat.id === 'health' ? '🍵' : '✨'}
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-trad-yellow group-hover:text-white transition-colors leading-tight mb-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-[9px] text-trad-paper/40 line-clamp-1 mb-1.5">{cat.description}</p>
                    <div className="inline-block px-1.5 py-0.5 rounded-full bg-trad-gold/10 border border-trad-gold/20 text-[8px] text-trad-gold whitespace-nowrap">
                      {cat.items.length}支签文
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && drawing && (
          <FortuneDraw 
            category={selectedCategory} 
            onComplete={handleDrawComplete} 
            soundEnabled={settings.soundEnabled}
            onCancel={handleBackToSelect}
          />
        )}

        {selectedCategory && result && (
          <FortuneDetail 
            category={selectedCategory} 
            item={result} 
            settings={settings}
            onBack={handleBackToSelect}
            onRedraw={handleReset}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xs bg-trad-red rounded-2xl overflow-hidden shadow-2xl border-2 border-trad-gold"
            >
              <div className="bg-trad-dark p-4 text-center border-b border-trad-gold/30">
                <h3 className="text-trad-yellow font-serif text-lg font-black tracking-widest">诚心祈福</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-trad-paper/80 mb-6 font-serif leading-relaxed italic">您即将开始抽取【{pendingCategory?.name}】，请平复心情，诚心祈愿。</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-3 border border-trad-gold/30 text-trad-gold/60 rounded-xl font-serif font-bold active:bg-trad-gold/5"
                  >
                    取消
                  </button>
                  <button 
                    onClick={startDraw}
                    className="flex-1 py-3 bg-trad-gold text-trad-red rounded-xl font-serif font-black shadow-lg active:scale-95 transition-transform"
                  >
                    确定
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
