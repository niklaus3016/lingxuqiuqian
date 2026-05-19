import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface GuideProps {
  onComplete: () => void;
}

const steps = [
  {
    title: '诚心求签',
    desc: '四大签类，助您解惑，心诚则灵。',
    icon: '🧧',
    color: 'bg-trad-red'
  },
  {
    title: '每日黄历',
    desc: '查看宜忌、财神方位，顺天时而行。',
    icon: '📅',
    color: 'bg-trad-yellow'
  },
  {
    title: '民俗常识',
    desc: '积累风水小常识，提升生活品质。',
    icon: '🏮',
    color: 'bg-trad-gold'
  }
];

export default function Guide({ onComplete }: GuideProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current === steps.length - 1) {
      onComplete();
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-trad-red bg-trad-pattern flex flex-col p-8"
    >
      <div className="flex justify-end">
        <button 
          onClick={onComplete}
          className="text-trad-yellow/60 text-sm font-medium font-serif"
        >
          跳过
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className={`w-32 h-32 rounded-3xl ${steps[current].color} flex items-center justify-center text-6xl shadow-2xl mb-8 border-4 border-trad-gold/30 rotate-3 group-hover:rotate-0 transition-transform`}>
              {steps[current].icon}
            </div>
            <h2 className="text-3xl font-serif font-bold text-trad-yellow mb-4 drop-shadow-md">
              {steps[current].title}
            </h2>
            <p className="text-trad-paper/80 leading-relaxed px-4 font-serif">
              {steps[current].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-trad-gold' : 'w-2 bg-trad-gold/20'}`}
            />
          ))}
        </div>
        
        <button
          onClick={next}
          className="w-full max-w-xs py-4 bg-trad-gold text-trad-red font-bold rounded-xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          {current === steps.length - 1 ? '开卷有益' : '下一步'}
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
