import { useState } from 'react';
import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAlmanacData } from '../../services/lunar';
import { cn } from '../../lib/utils';

interface AlmanacDetailProps {
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  currentDate: Date;
}

export default function AlmanacDetail({ onClose, onSelectDate, currentDate }: AlmanacDetailProps) {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const data = getAlmanacData(selectedDate);

  // Generate week
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
  
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    weekDays.push(d);
  }

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-trad-red flex flex-col"
    >
      <header className="p-3 flex items-center justify-between border-b border-trad-gold/30 bg-trad-dark sticky top-0 z-10 shadow-lg shadow-black/20">
        <button onClick={onClose} className="p-2 -ml-1 text-trad-yellow z-10">
          <ChevronLeft size={24} />
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-xl font-serif font-black text-trad-yellow tracking-[0.2em] [text-shadow:0_0_15px_rgba(234,179,8,0.3)]">
          周历详情
        </h1>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex flex-col gap-8 pb-4">
          {/* Weekly Header */}
          <div className="flex justify-between items-center bg-trad-dark/30 p-2 rounded-2xl border border-trad-gold/20 shadow-inner">
             {weekDays.map((d, i) => {
               const isSelected = d.toDateString() === selectedDate.toDateString();
               const isToday = d.toDateString() === new Date().toDateString();
               return (
                 <button 
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all",
                    isSelected ? "bg-trad-gold text-trad-red shadow-lg scale-105" : "text-trad-paper/40"
                  )}
                 >
                   <span className="text-[10px] uppercase font-serif">{['日', '一', '二', '三', '四', '五', '六'][d.getDay()]}</span>
                   <span className="text-lg font-serif font-black">{d.getDate()}</span>
                   {isToday && !isSelected && <div className="w-1.5 h-1.5 bg-trad-gold rounded-full" />}
                 </button>
               );
             })}
          </div>

          {/* Selected Date Detail Card */}
          <div className="bg-trad-dark/80 rounded-3xl p-8 border border-trad-gold/30 shadow-2xl relative overflow-hidden">
             <div className="absolute -top-4 -right-4 text-[130px] font-serif opacity-[0.05] pointer-events-none text-trad-gold rotate-12">
               {data.zodiac}
             </div>

             <div className="mb-10 text-center relative">
               <div className="text-sm font-serif text-trad-gold mb-2 font-black tracking-[0.3em] uppercase">{data.ganZhiYear}</div>
               <h2 className="text-4xl font-serif font-black text-trad-yellow [text-shadow:0_0_20px_rgba(234,179,8,0.3)] tracking-wider">
                 {data.lunarDate}
               </h2>
               <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-trad-gold/30 to-transparent mx-auto my-4" />
               <div className="text-xs text-trad-paper/50 tracking-widest font-serif">
                 {new Date(data.solarDate.split(' ')[0]).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
               </div>
             </div>

             <div className="space-y-8">
               <div className="flex flex-col gap-6">
                 <div className="relative group">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-trad-gold opacity-50 rounded-full" />
                    <div className="bg-trad-red/20 rounded-2xl p-5 border border-trad-gold/10 shadow-inner">
                       <div className="flex items-center gap-2 mb-4">
                         <span className="text-xs font-black text-trad-yellow tracking-widest bg-trad-gold/20 px-2 py-0.5 rounded">宜</span>
                         <div className="flex-1 h-px bg-trad-gold/10" />
                       </div>
                       <div className="flex flex-wrap gap-2.5">
                         {data.yi.map(y => (
                           <span key={y} className="text-sm font-serif font-bold text-trad-paper hover:text-trad-yellow transition-colors cursor-default">
                             {y}
                           </span>
                         ))}
                       </div>
                    </div>
                 </div>

                 <div className="relative group">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-trad-paper/20 rounded-full" />
                    <div className="bg-trad-dark/40 rounded-2xl p-5 border border-trad-gold/5 shadow-inner">
                       <div className="flex items-center gap-2 mb-4">
                         <span className="text-xs font-black text-trad-paper/40 tracking-widest bg-trad-paper/5 px-2 py-0.5 rounded">忌</span>
                         <div className="flex-1 h-px bg-trad-paper/5" />
                       </div>
                       <div className="flex flex-wrap gap-2.5">
                         {data.ji.map(j => (
                           <span key={j} className="text-sm font-serif font-bold text-trad-paper/30 italic">
                             {j}
                           </span>
                         ))}
                       </div>
                    </div>
                 </div>
               </div>

               <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-trad-dark to-trad-dark/60 border border-trad-gold/20 shadow-xl group">
                  <div className="absolute inset-0 bg-trad-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-trad-gold/60 uppercase tracking-widest mb-1">今日财神方位</span>
                      <span className="text-base font-serif font-black text-trad-yellow tracking-widest">{data.wealthDirection}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-trad-gold/10 flex items-center justify-center text-trad-gold border border-trad-gold/20">
                      💰
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-trad-gold/20 via-transparent to-transparent w-full my-4" />
                  <div className="text-[10px] text-trad-paper/40 leading-relaxed italic text-center font-serif tracking-widest">
                     「 顺天者昌 · 逆天者亡 」
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Button - Fixed outside scroll Area */}
      <div className="p-6 bg-trad-dark/40 border-t border-trad-gold/10 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
        <button 
          onClick={() => onSelectDate(selectedDate)}
          className="w-full py-4 bg-trad-gold text-trad-red rounded-2xl font-serif font-black shadow-xl active:scale-95 transition-transform tracking-widest text-base shadow-trad-gold/20"
        >
          查看此日详细黄历
        </button>
      </div>
    </motion.div>
  );
}
