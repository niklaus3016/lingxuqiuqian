import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Trash2, HeartOff, Sparkles } from 'lucide-react';
import { FavoriteItem, FortuneItem, Settings, FortuneCategory } from '../../types';
import { cn } from '../../lib/utils';
import fortunesData from '../../data/fortunes.json';
import FortuneDetail from '../fortune/FortuneDetail';

interface FavoritesProps {
  onBack: () => void;
  settings: Settings;
}

export default function Favorites({ onBack, settings }: FavoritesProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<{item: FortuneItem, category: FortuneCategory} | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('app_favorites') || '[]');
    setFavorites(saved);
  }, []);

  const filtered = favorites.filter(f => f.type === 'fortune');

  const removeFavorite = (item: FavoriteItem) => {
    const updated = favorites.filter(f => 
      !(f.type === item.type && f.timestamp === item.timestamp)
    );
    setFavorites(updated);
    localStorage.setItem('app_favorites', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm('确定要清空所有收藏吗？')) {
      setFavorites([]);
      localStorage.setItem('app_favorites', '[]');
    }
  };

  if (selectedItem) {
    return (
      <div className="flex flex-col h-full bg-trad-pattern p-6">
        <FortuneDetail 
          category={selectedItem.category}
          item={selectedItem.item}
          settings={settings}
          onBack={() => setSelectedItem(null)}
          onRedraw={() => {
            // In favorites, redraw just picks another random one from same category for convenience?
            // Or maybe just hide the button? FortuneDetail is shared.
            // Let's just find another one if requested.
            const items = selectedItem.category.items;
            const next = items[Math.floor(Math.random() * items.length)];
            setSelectedItem({ ...selectedItem, item: next });
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-trad-pattern">
      <header className="p-3 flex items-center justify-between border-b border-trad-gold/30 bg-trad-dark sticky top-0 z-10 shadow-lg shadow-black/20">
        <button onClick={onBack} className="p-2 -ml-1 text-trad-yellow active:scale-90 transition-transform z-10">
          <ChevronLeft size={24} />
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-xl font-serif font-black text-trad-yellow tracking-[0.2em] [text-shadow:0_0_15px_rgba(234,179,8,0.3)]">
          我的收藏
        </h1>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 mt-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-trad-yellow/20 gap-4"
            >
              <HeartOff size={64} strokeWidth={1} />
              <p className="font-serif">暂无内容，快去探索吧</p>
            </motion.div>
          ) : (
            filtered.map((item, i) => (
              <motion.div
                key={item.timestamp}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-trad-dark/30 p-5 rounded-2xl border border-trad-gold/10 shadow-sm flex flex-col gap-3 group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-trad-red font-bold uppercase tracking-widest bg-trad-gold/80 px-2 py-0.5 rounded-full inline-block w-max mb-2">
                       {item.categoryName}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-trad-yellow group-active:text-trad-paper transition-colors">
                       {(item.data as FortuneItem).title}
                    </h3>
                  </div>
                  <button onClick={() => removeFavorite(item)} className="p-2 text-trad-yellow/20 hover:text-trad-yellow transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <p className="text-sm text-trad-paper/60 line-clamp-2 italic font-serif">
                  {(item.data as FortuneItem).poem}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-trad-gold/5">
                   <span className="text-[10px] text-trad-paper/30 italic">
                     收藏于 {new Date(item.timestamp).toLocaleDateString('zh-CN')}
                   </span>
                   <button 
                     onClick={() => {
                       const category = fortunesData.categories.find(c => c.name === item.categoryName);
                       if (category) {
                         setSelectedItem({
                           item: item.data as FortuneItem,
                           category: category as FortuneCategory
                         });
                       }
                     }}
                     className="text-[10px] font-bold text-trad-red bg-trad-gold px-3 py-1 rounded-full active:scale-95 transition-transform"
                   >
                     查看详情
                   </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
