import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { Heart, RefreshCw } from 'lucide-react';
import { FortuneCategory, FortuneItem, Settings, FavoriteItem } from '../../types';
import { cn } from '../../lib/utils';

interface FortuneDetailProps {
  category: FortuneCategory;
  item: FortuneItem;
  settings: Settings;
  onBack: () => void;
  onRedraw: () => void;
}

export default function FortuneDetail({ category, item, settings, onBack, onRedraw }: FortuneDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // 检查是否已收藏
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('app_favorites') || '[]');
    const exists = favorites.some((fav: FavoriteItem) => 
      fav.type === 'fortune' && (fav.data as FortuneItem).id === item.id && fav.categoryName === category.name
    );
    setIsFavorite(exists);
  }, [item.id, category.name]);

  const toggleFavorite = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem('app_favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((fav: FavoriteItem) => 
        !(fav.type === 'fortune' && (fav.data as FortuneItem).id === item.id && fav.categoryName === category.name)
      );
      localStorage.setItem('app_favorites', JSON.stringify(updated));
    } else {
      const newItem: FavoriteItem = {
        type: 'fortune',
        data: item,
        timestamp: Date.now(),
        categoryName: category.name
      };
      favorites.unshift(newItem);
      localStorage.setItem('app_favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  }, [isFavorite, item, category.name]);

  // 计算签文位置
  const signIndex = useMemo(() => {
    return category.items.findIndex(i => i.id === item.id) + 1;
  }, [category.items, item.id]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      {/* Result Card */}
      <div className="relative bg-trad-dark rounded-3xl overflow-hidden shadow-2xl border-2 border-trad-gold shadow-black/40">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-trad-gold">
          <div className="text-9xl font-serif">{category.name.substring(0, 1)}</div>
        </div>
        
        <div className="bg-trad-red pt-8 pb-6 px-6 text-center text-trad-yellow flex flex-col items-center gap-4 border-b border-trad-gold/30 relative">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl font-serif font-black text-trad-yellow tracking-[0.2em] drop-shadow-md leading-tight uppercase [text-shadow:0_0_10px_rgba(234,179,8,0.2)]">
              {category.name}
            </h2>
            <div className="h-px w-16 bg-trad-gold/50" />
            <div className="text-[10px] text-trad-yellow/60 font-serif tracking-[0.1em] mt-1">
              第 {signIndex} 签 · 共 {category.items.length} 支
            </div>
          </div>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-trad-dark/30 border border-trad-gold/30 text-xs font-bold tracking-widest shadow-inner">
            {item.title}
          </div>
        </div>

        <div className="p-8 pb-10 flex flex-col items-center gap-12">
          {/* Poem Section */}
          <div className="relative text-center w-full py-4 text-horizontal">
            <div className="absolute -inset-8 bg-trad-gold/5 rounded-full blur-3xl -z-10" />
            
            {/* Traditional Quote Marks Decoration */}
            <div className="absolute -top-2 -left-2 text-2xl text-trad-gold/20 font-serif">「</div>
            <div className="absolute -bottom-2 -right-2 text-2xl text-trad-gold/20 font-serif">」</div>

            <div className="font-serif font-bold text-trad-yellow drop-shadow-lg text-lg tracking-[0.05em] leading-loose max-w-[85%] mx-auto flex flex-col items-center gap-1">
              {item.poem.split(/[，；。！]/).filter(line => line.trim() !== '').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 text-left w-full max-w-sm mx-auto">
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-trad-gold" />
                <h4 className="text-[10px] font-black text-trad-gold uppercase tracking-[0.2em]">
                  签语大意
                </h4>
                <div className="flex-1 h-px bg-trad-gold/10" />
              </div>
              <p className="text-trad-paper/90 leading-relaxed text-sm font-serif pl-4 border-l border-trad-gold/20">
                {item.detail}
              </p>
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-trad-gold/50" />
                <h4 className="text-[10px] font-black text-trad-gold/60 uppercase tracking-[0.2em]">
                  祈福建议
                </h4>
                <div className="flex-1 h-px bg-trad-gold/10" />
              </div>
              <div className="bg-trad-gold/5 p-4 rounded-xl border border-trad-gold/10 shadow-inner">
                <p className="text-trad-paper/50 italic leading-relaxed text-xs font-serif">
                  {item.advice}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-trad-dark/50 p-4 text-center border-t border-trad-gold/10">
          <p className="text-[10px] text-trad-paper/40 italic flex items-center justify-center gap-2">
            <span className="w-1 h-1 rounded-full bg-trad-paper/20" />
            本APP仅供娱乐，请理性参考
            <span className="w-1 h-1 rounded-full bg-trad-paper/20" />
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          icon={<Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />} 
          label={isFavorite ? '已收藏' : '收藏'} 
          onClick={toggleFavorite}
          active={isFavorite}
        />
        <ActionButton 
          icon={<RefreshCw size={20} />} 
          label="重抽" 
          onClick={onRedraw} 
        />
      </div>

      <div className="flex justify-center mt-2">
        <button 
          onClick={onBack}
          className="text-xs font-bold bg-trad-dark/80 border border-trad-gold/30 px-8 py-3 rounded-full text-trad-yellow shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
          返回签箱
        </button>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick, active }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-2xl gap-2 transition-all active:scale-90",
        active ? "bg-trad-gold text-trad-red" : "bg-trad-dark/60 text-trad-yellow border border-trad-gold/20 shadow-lg"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}
