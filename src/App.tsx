import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, FavoriteItem } from './types';
import Home from './components/home/Home';
import FortuneHome from './components/fortune/FortuneHome';
import AlmanacHome from './components/almanac/AlmanacHome';
import Favorites from './components/favorites/Favorites';
import SettingsView from './components/settings/SettingsView';
import { Smartphone } from 'lucide-react';
import { PrivacyModal, AgreementModal, PrivacyPolicyContent, UserAgreementContent, DeclineModal } from './components/agreement/AgreementComponents';
import { storage } from './lib/storage';

type Page = 'home' | 'fortune' | 'almanac' | 'favorites' | 'settings';
type AgreementType = 'privacy' | 'agreement' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLandscape, setIsLandscape] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    fontSize: 'medium',
    soundEnabled: true,
    layoutMode: 'vertical'
  });

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAgreementDetail, setShowAgreementDetail] = useState<AgreementType>(null);

  useEffect(() => {
    const agreed = localStorage.getItem('user_agreed');
    if (!agreed) {
      setShowPrivacyModal(true);
    }

    const savedSettings = storage.getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }

    let resizeTimeout: NodeJS.Timeout;
    const checkOrientation = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsLandscape(window.innerWidth > window.innerHeight);
      }, 100);
    };

    window.addEventListener('resize', checkOrientation);
    checkOrientation();
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  const handleAcceptAgreement = () => {
    localStorage.setItem('user_agreed', 'true');
    setShowPrivacyModal(false);
  };

  const handleDeclineAgreement = () => {
    setShowPrivacyModal(false);
    setShowDeclineModal(true);
  };

  const handleDeclineCancel = () => {
    setShowDeclineModal(false);
    setShowPrivacyModal(true);
  };

  const handleDeclineConfirm = () => {
    setShowDeclineModal(false);
  };

  const handleOpenAgreement = () => {
    setShowAgreementDetail('agreement');
  };

  const handleOpenPrivacy = () => {
    setShowAgreementDetail('privacy');
  };

  const handleCloseAgreementDetail = () => {
    setShowAgreementDetail(null);
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('app_settings', JSON.stringify(updated));
  };

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'extra': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div 
      id="app-root"
      className={`min-h-screen bg-trad-paper text-trad-ink selection:bg-trad-yellow/30 ${getFontSizeClass()} flex flex-col items-center overflow-x-hidden`}
    >
      <AnimatePresence>
        {isLandscape && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-trad-red flex flex-col items-center justify-center text-white p-12 text-center"
          >
            <div className="animate-bounce mb-6">
              <Smartphone size={64} className="rotate-90" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">请竖屏使用</h3>
            <p className="opacity-80">为了获得最佳的抽签祈福体验，请将手机旋转至竖屏模式。</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md min-h-screen flex flex-col relative shadow-2xl bg-trad-red border-8 border-trad-gold overflow-hidden">
        <div className="lattice-corner lattice-top-left" />
        <div className="lattice-corner lattice-top-right" />
        <div className="lattice-corner lattice-bottom-left" />
        <div className="lattice-corner lattice-bottom-right" />

        <main className="flex-1 w-full bg-trad-pattern pb-4 relative z-0">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="h-full relative z-10"
              >
                <Home onNavigate={setCurrentPage} />
              </motion.div>
            )}

            {currentPage === 'fortune' && (
              <motion.div
                key="fortune"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full relative z-10"
              >
                <FortuneHome onBack={() => setCurrentPage('home')} settings={settings} />
              </motion.div>
            )}

            {currentPage === 'almanac' && (
              <motion.div
                key="almanac"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full relative z-10"
              >
                <AlmanacHome onBack={() => setCurrentPage('home')} />
              </motion.div>
            )}

            {currentPage === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full relative z-10"
              >
                <Favorites onBack={() => setCurrentPage('home')} settings={settings} />
              </motion.div>
            )}

            {currentPage === 'settings' && (
              <motion.div
                key="settings"
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 300, opacity: 0 }}
                className="h-full relative z-10"
              >
                <SettingsView 
                  onBack={() => setCurrentPage('home')} 
                  settings={settings} 
                  onUpdate={updateSettings} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="px-6 py-3 text-center text-[9px] text-trad-yellow/40 z-20">
          <div className="max-w-[280px] mx-auto leading-relaxed">
            本APP仅供娱乐，不构成任何实际指导。<br className="xs:hidden" />传承传统文化，科学面对生活。
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {showPrivacyModal && (
          <PrivacyModal
            onAccept={handleAcceptAgreement}
            onDecline={handleDeclineAgreement}
            onOpenAgreement={handleOpenAgreement}
            onOpenPrivacy={handleOpenPrivacy}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAgreementDetail === 'privacy' && (
          <AgreementModal
            onClose={handleCloseAgreementDetail}
            title="隐私政策"
            content={<PrivacyPolicyContent />}
          />
        )}
        {showAgreementDetail === 'agreement' && (
          <AgreementModal
            onClose={handleCloseAgreementDetail}
            title="用户服务协议"
            content={<UserAgreementContent />}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeclineModal && (
          <DeclineModal
            onCancel={handleDeclineCancel}
            onConfirm={handleDeclineConfirm}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeclineModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-trad-red flex flex-col items-center justify-center text-white p-12 text-center"
          >
            <div className="mb-6 text-6xl">🙏</div>
            <h3 className="text-2xl font-serif font-bold mb-4">需要您同意协议</h3>
            <p className="opacity-80 max-w-xs">抱歉，为了正常使用本应用，请您同意用户协议与隐私政策。</p>
            <button
              onClick={handleDeclineCancel}
              className="mt-8 px-8 py-3 bg-trad-gold text-trad-red font-bold rounded-xl"
            >
              返回同意
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}