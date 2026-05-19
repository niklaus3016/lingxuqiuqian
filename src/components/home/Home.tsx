import { motion } from 'motion/react';
import { Sparkles, Calendar, Heart, Settings, Info } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="p-6 flex flex-col gap-6 h-full">
      {/* App Header / Brand */}
      <header className="py-6 flex flex-col items-center">
        <div className="relative mb-3">
          <div className="absolute inset-0 bg-trad-gold/20 blur-2xl rounded-full" />
          <div className="w-10 h-10 bg-trad-red rounded-lg flex items-center justify-center text-trad-yellow text-xl font-serif shadow-[0_0_15px_rgba(255,215,0,0.3)] border-2 border-trad-gold rotate-45">
            <span className="-rotate-45 font-black">灵</span>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-black text-trad-yellow tracking-[0.2em] mb-1 [text-shadow:0_0_20px_rgba(234,179,8,0.3)]">
          灵序求签
        </h1>
        <div className="h-px w-20 bg-trad-gold/30 mb-2" />
        <p className="text-[10px] text-trad-paper/40 tracking-widest uppercase font-serif">趣味祈福 · 民俗黄历</p>
      </header>

      {/* Main Core Features */}
      <div className="grid grid-cols-1 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('fortune')}
          className="relative h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-trad-gold/50 group"
        >
          <div className="absolute inset-0 bg-gradient-to-bottom-right from-trad-dark to-trad-red" />
          <div className="absolute top-0 right-0 p-4 opacity-5 text-trad-gold">
            <Sparkles size={120} />
          </div>
          <div className="relative h-full p-6 flex flex-col justify-end">
            <h2 className="text-2xl font-serif font-bold text-trad-yellow mb-1 flex items-center gap-2">
              抽签解签
              <Sparkles size={24} />
            </h2>
            <p className="text-trad-paper/70 text-sm">婚姻、事业、健康、运势</p>
          </div>
          <div className="absolute top-4 right-4 text-trad-gold/40 font-serif writing-vertical uppercase tracking-widest text-lg">
            灵签
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('almanac')}
          className="relative h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-trad-gold/50 group"
        >
          <div className="absolute inset-0 bg-gradient-to-bottom-right from-trad-gold to-amber-600" />
          <div className="absolute top-0 right-0 p-4 opacity-10 text-trad-red">
            <Calendar size={120} />
          </div>
          <div className="relative h-full p-6 flex flex-col justify-end">
            <h2 className="text-2xl font-serif font-bold text-trad-red mb-1 flex items-center gap-2">
              每日黄历
              <Calendar size={24} />
            </h2>
            <p className="text-trad-red/80 text-sm font-bold">查看宜忌、财神方位</p>
          </div>
          <div className="absolute top-4 right-4 text-trad-red/40 font-serif writing-vertical uppercase tracking-widest text-lg">
            黄历
          </div>
        </motion.button>
      </div>

      {/* Secondary Menu */}
      <div className="grid grid-cols-2 gap-4">
        <MenuButton 
          icon={<Heart size={20} />} 
          label="我的收藏" 
          onClick={() => onNavigate('favorites')}
          color="text-rose-600"
        />
        <MenuButton 
          icon={<Settings size={20} />} 
          label="设置" 
          onClick={() => onNavigate('settings')}
          color="text-slate-600"
        />
      </div>
    </div>
  );
}

function MenuButton({ icon, label, onClick, color, className = "" }: any) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      onClick={onClick}
      className={`p-4 bg-trad-dark/40 backdrop-blur rounded-xl border border-trad-gold/30 shadow-sm flex items-center gap-3 active:bg-trad-dark transition-colors ${className}`}
    >
      <div className={`${color} p-2 bg-trad-paper rounded-lg shadow-inner`}>
        {icon}
      </div>
      <span className="font-serif font-semibold text-trad-paper">{label}</span>
    </motion.button>
  );
}
