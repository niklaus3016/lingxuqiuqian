import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Download, Search, Info, X } from 'lucide-react';
import { getAlmanacData, AlmanacData } from '../../services/lunar';
import tipsData from '../../data/tips.json';
import { cn } from '../../lib/utils';
import AlmanacDetail from './AlmanacDetail';

interface AlmanacHomeProps {
  onBack: () => void;
}

export default function AlmanacHome({ onBack }: AlmanacHomeProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showHourLuck, setShowHourLuck] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);

  const data = useMemo(() => getAlmanacData(currentDate), [currentDate]);
  const currentTip = useMemo(() => tipsData.tips[Math.floor(Math.random() * tipsData.tips.length)], []);

  const changeDate = useCallback((days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  }, [currentDate]);

  return (
    <div className="flex flex-col h-full bg-trad-pattern">
      <header className="p-3 flex items-center justify-between border-b border-trad-gold/30 bg-trad-dark sticky top-0 z-10 shadow-lg shadow-black/20">
        <button onClick={onBack} className="p-2 -ml-1 text-trad-yellow active:scale-90 transition-transform z-10">
          <ChevronLeft size={24} />
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-xl font-serif font-black text-trad-yellow tracking-widest [text-shadow:0_0_15px_rgba(234,179,8,0.3)]">
          每日黄历
        </h1>
        <div className="flex z-10 pr-3">
           <button className="p-2 text-trad-yellow/40" onClick={() => setShowWeekly(true)}><CalendarIcon size={20} /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Date Selector */}
        <div className="flex items-center justify-between bg-trad-dark/40 p-2 rounded-full border border-trad-gold/20">
          <button onClick={() => changeDate(-1)} className="p-2 text-trad-yellow"><ChevronLeft size={20} /></button>
          <div className="text-center">
             <div className="text-xs font-bold text-trad-yellow opacity-60 uppercase tracking-tighter">
               {new Date(data.solarDate.split(' ')[0]).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
             </div>
             <div className="text-sm font-serif font-bold text-trad-paper">{data.lunarDate}</div>
          </div>
          <button onClick={() => changeDate(1)} className="p-2 text-trad-yellow"><ChevronRight size={20} /></button>
        </div>

        {/* Main Calendar Card */}
        <motion.div 
          key={data.solarDate}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-trad-red rounded-3xl overflow-hidden shadow-2xl border-2 border-trad-gold flex flex-col shadow-black/50"
        >
          {/* Calendar Header */}
          <div className="bg-trad-dark p-6 text-trad-yellow text-center relative border-b border-trad-gold/20">
            <div className="absolute top-2 left-4 text-4xl opacity-10 font-serif text-trad-gold">{data.zodiac}</div>
            <div className="text-sm font-serif opacity-80 mb-2">{data.ganZhiYear} · {data.ganZhiMonth} · {data.ganZhiDay}</div>
            <div className="text-6xl font-serif font-bold my-4 tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {currentDate.getDate()}
            </div>
            {data.solarTerm && (
              <div className="inline-block px-3 py-1 bg-trad-gold text-trad-red text-xs font-bold rounded-full shadow-inner mb-4">
                {data.solarTerm}
              </div>
            )}
            
            <div className="flex justify-center mb-[-12px] z-10 relative">
              <button 
                onClick={() => setShowWeekly(true)}
                className="bg-trad-dark/90 border border-trad-gold/30 px-3 py-1 rounded-full text-[10px] text-trad-yellow font-serif font-black flex items-center gap-1 shadow-lg hover:bg-trad-gold hover:text-trad-red transition-all"
              >
                查看详细宜忌 <ChevronRight size={10} />
              </button>
            </div>
          </div>

          {/* Yi/Ji Section */}
          <div className="p-6 grid grid-cols-2 gap-px bg-trad-gold/20 border-b border-trad-gold/10">
            <div className="bg-trad-dark/80 p-4 flex flex-col gap-2 rounded-bl-3xl">
              <div className="w-8 h-8 rounded-full bg-trad-gold text-trad-red flex items-center justify-center font-bold text-sm">宜</div>
              <div className="flex flex-wrap gap-2">
                {data.yi.slice(0, 4).map(y => <span key={y} className="text-xs font-serif font-bold text-trad-paper">{y}</span>)}
              </div>
            </div>
            <div className="bg-trad-dark/80 p-4 flex flex-col gap-2 rounded-br-3xl">
              <div className="w-8 h-8 rounded-full bg-trad-red text-trad-yellow flex items-center justify-center font-bold text-sm border border-trad-yellow/30">忌</div>
              <div className="flex flex-wrap gap-2">
                {data.ji.slice(0, 4).map(j => <span key={j} className="text-xs font-serif font-bold text-trad-paper/60">{j}</span>)}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-6 pt-8 space-y-4 bg-trad-red/40 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-trad-paper/60 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-trad-gold" /> 财神方位</span>
              <span className="font-bold text-trad-yellow">{data.wealthDirection}</span>
            </div>
            <div className="h-px bg-trad-gold/10 w-full" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-trad-paper/60 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-trad-yellow" /> 今日吉凶</span>
              <button onClick={() => setShowHourLuck(true)} className="text-xs text-trad-yellow font-bold underline decoration-trad-yellow/30">
                查看时辰吉凶
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tip Section */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-trad-gold/0 via-trad-gold/30 to-trad-gold/0 blur-[2px] rounded-xl" />
          <div className="relative bg-trad-dark/60 p-4 rounded-xl border border-trad-gold/30 flex flex-col items-center text-center shadow-xl">
            <p className="text-base text-trad-yellow font-serif font-bold leading-relaxed tracking-wide">
              民俗常识
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-trad-gold/40 to-transparent my-1.5" />
            <p className="text-[10px] text-trad-paper/40 font-serif italic leading-relaxed">
              「 {currentTip.content} 」
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showHourLuck && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowHourLuck(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-trad-red rounded-3xl p-6 shadow-2xl border-2 border-trad-gold overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-trad-gold/5 rounded-full blur-2xl" />
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-serif font-black text-trad-yellow tracking-widest bg-trad-gold/10 px-3 py-1 rounded-lg border border-trad-gold/20">今日时辰吉凶</h3>
                <button onClick={() => setShowHourLuck(false)} className="p-2 text-trad-yellow/40 hover:text-trad-yellow transition-colors"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide pb-2 relative z-10">
                {data.hourLuck.map((h, i) => (
                  <div key={i} className="flex flex-col p-4 bg-trad-dark/30 rounded-xl border border-trad-gold/10 hover:border-trad-gold/30 transition-colors group">
                    <span className="text-[10px] text-trad-paper/40 mb-1 font-serif tracking-widest">{h.hour}</span>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "font-serif font-black text-base",
                        h.luck === '吉' ? "text-trad-yellow [text-shadow:0_0_8px_rgba(234,179,8,0.3)]" : "text-trad-paper/30"
                      )}>{h.luck}</span>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        h.luck === '吉' ? "bg-trad-yellow shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "bg-trad-paper/10"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {showWeekly && (
          <AlmanacDetail 
            onClose={() => setShowWeekly(false)} 
            onSelectDate={(d) => { setCurrentDate(d); setShowWeekly(false); }}
            currentDate={currentDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
