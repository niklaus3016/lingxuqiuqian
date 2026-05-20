import { useState, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import confetti from 'canvas-confetti';
import { FortuneCategory, FortuneItem } from '../../types';

interface FortuneDrawProps {
  category: FortuneCategory;
  onComplete: (item: FortuneItem) => void;
  soundEnabled: boolean;
  onCancel: () => void;
}

export default function FortuneDraw({ category, onComplete, soundEnabled, onCancel }: FortuneDrawProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const shakeControls = useAnimation();

  // Audio refs initialized in useEffect to ensure they are ready
  const audioContext = useRef<AudioContext | null>(null);

  const playShakeSound = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContext.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playSuccessSound = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContext.current;
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime + index * 0.15);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + index * 0.15 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.15 + 0.3);
      
      oscillator.start(ctx.currentTime + index * 0.15);
      oscillator.stop(ctx.currentTime + index * 0.15 + 0.3);
    });
  };

  const handleStartDraw = async () => {
    if (isShaking) return;

    setIsShaking(true);
    setProgress(0);

    // Play shake sound
    if (soundEnabled) {
      playShakeSound();
    }

    // Shake sequence
    const totalSteps = 12;
    for (let i = 0; i < totalSteps; i++) {
      await shakeControls.start({
        x: [0, -10, 10, -10, 10, 0],
        rotate: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.3 }
      });
      setProgress(((i + 1) / totalSteps) * 100);
    }

    // Play success sound
    if (soundEnabled) {
      playSuccessSound();
    }

    // Success!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C41E3A', '#FFD700', '#D4AF37']
    });

    const randomItem = category.items[Math.floor(Math.random() * category.items.length)];
    setTimeout(() => {
      onComplete(randomItem);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full gap-12">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-trad-yellow mb-2 tracking-widest">{category.name}</h2>
        <p className="text-sm text-trad-paper/60 font-serif">诚心祈愿 · 摇晃签筒</p>
      </div>

      <motion.div
        animate={shakeControls}
        onClick={handleStartDraw}
        className="relative cursor-pointer"
      >
        {/* The Sign Pot */}
        <div className="w-32 h-48 bg-gradient-to-bottom from-trad-dark to-trad-red rounded-t-lg rounded-b-3xl border-x-4 border-trad-gold flex flex-col items-center pt-4 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 w-full h-4 bg-trad-gold/40" />
          <div className="text-trad-gold/20 text-4xl font-serif writing-vertical tracking-widest mt-4">
            {category.name.substring(0, 2)}
          </div>
          <div className="absolute bottom-4 text-trad-gold/20 text-2xl font-serif">
            {category.id === 'marriage' ? '囍' : 
             category.id === 'career' ? '财' : 
             category.id === 'health' ? '康' : '吉'}
          </div>
          
          {/* Animated Sticks */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 items-end">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={isShaking ? {
                  y: [0, -20, 0],
                  rotate: [0, Math.random() * 10 - 5, 0]
                } : {}}
                transition={{
                  repeat: isShaking ? Infinity : 0,
                  duration: 0.2,
                  delay: i * 0.05
                }}
                className="w-2 h-20 bg-amber-200 rounded-t-sm border border-amber-800/20"
              >
                <div className="h-4 bg-red-600 rounded-t-sm" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shadow */}
        <div className="w-32 h-4 bg-black/10 rounded-full mt-2 blur-md mx-auto" />
        
        {isShaking && (
          <div className="mt-8 text-center">
            <p className="text-xs text-trad-yellow font-serif font-black tracking-[0.2em] animate-pulse [text-shadow:0_0_10px_rgba(234,179,8,0.3)]">
              沙沙沙... 灵签感应中...
            </p>
          </div>
        )}
      </motion.div>

      <div className="w-full max-w-xs space-y-6">
        {isShaking && (
          <div className="w-full bg-trad-gold/10 h-1 rounded-full overflow-hidden border border-trad-gold/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-trad-gold"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            disabled={isShaking}
            onClick={onCancel}
            className="flex-1 py-4 border border-trad-gold/30 text-trad-gold/60 rounded-xl font-serif font-bold disabled:opacity-30"
          >
            返回
          </button>
          <button
            disabled={isShaking}
            onClick={handleStartDraw}
            className="flex-1 py-4 bg-trad-gold text-trad-red rounded-xl font-serif font-black shadow-xl active:scale-95 transition-transform disabled:bg-trad-gold/20 disabled:text-trad-gold/10"
          >
            {isShaking ? '抽签中...' : '开始求签'}
          </button>
        </div>
      </div>
    </div>
  );
}
