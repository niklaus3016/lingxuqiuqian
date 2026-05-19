import { motion } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';
import React from 'react';

interface PrivacyModalProps {
  onAccept: () => void;
  onDecline: () => void;
  onOpenAgreement: () => void;
  onOpenPrivacy: () => void;
}

export const PrivacyModal = ({ onAccept, onDecline, onOpenAgreement, onOpenPrivacy }: PrivacyModalProps) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-trad-red w-full max-w-sm shadow-2xl max-h-[80vh] overflow-y-auto rounded-3xl border-2 border-trad-gold"
    >
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-trad-yellow mb-6 text-center pt-4 tracking-widest">
          用户协议与隐私政策
        </h3>
        <div className="mb-6">
          <p className="text-base text-trad-paper mb-3">(1)《隐私政策》中关于个人设备用户信息的收集和使用的说明。</p>
          <p className="text-base text-trad-paper">(2)《隐私政策》中与第三方SDK类服务商数据共享、相关信息收集和使用说明。</p>
        </div>
        <div className="mb-6">
          <p className="text-sm text-trad-paper/60 mb-2">用户协议和隐私政策说明：</p>
          <p className="text-sm text-trad-paper/80">
            阅读完整的
            <span
              onClick={onOpenAgreement}
              className="text-trad-gold hover:underline cursor-pointer font-medium mx-1"
            >
              《用户服务协议》
            </span>
            和
            <span
              onClick={onOpenPrivacy}
              className="text-trad-gold hover:underline cursor-pointer font-medium mx-1"
            >
              《隐私政策》
            </span>
            了解详细内容。
          </p>
        </div>
      </div>
      <div className="flex border-t border-trad-gold/30">
        <button
          onClick={onDecline}
          className="flex-1 py-4 text-base font-medium text-trad-paper bg-trad-dark hover:bg-trad-dark/80 transition-colors border-r border-trad-gold/30"
        >
          不同意
        </button>
        <button
          onClick={onAccept}
          className="flex-1 py-4 text-base text-trad-red bg-trad-gold hover:bg-trad-gold/90 transition-colors font-bold"
        >
          同意并继续
        </button>
      </div>
    </motion.div>
  </div>
);

interface AgreementModalProps {
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const AgreementModal = ({ onClose, title, content }: AgreementModalProps) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-110">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-trad-red rounded-3xl w-full max-w-3xl h-[85vh] overflow-hidden shadow-2xl border-2 border-trad-gold flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-trad-gold/30 bg-trad-dark shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-trad-gold/20 text-trad-gold rounded-xl flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
          <h2 className="text-xl font-serif font-bold text-trad-yellow tracking-widest">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-trad-paper/10 flex items-center justify-center text-trad-paper/60 active:scale-90 transition-transform hover:bg-trad-paper/20"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-trad-pattern p-6">
        {content}
      </div>
    </motion.div>
  </div>
);

export const PrivacyPolicyContent = () => (
  <div className="max-w-none text-trad-paper">
    <h1 className="text-2xl font-bold text-trad-gold text-center mb-2 font-serif tracking-wider">🔒 隐私政策</h1>
    <p className="text-center text-trad-paper/50 mb-6"><strong>生效日期</strong>：2026年05月19日</p>

    <div className="bg-trad-dark/40 p-6 rounded-lg border-l-4 border-trad-gold mb-6">
      <p className="text-trad-paper">欢迎使用「灵序求签」（以下简称"本应用"）。本应用由<strong>光年跃迁（温州）科技有限公司</strong>（以下简称"我们"）开发并运营。我们深知个人信息对您的重要性，将严格遵守《中华人民共和国个人信息保护法》等相关法律法规，保护您的个人信息安全。</p>
    </div>

    <p className="mb-6 text-trad-paper/80">本隐私政策旨在说明我们如何收集、使用、存储和保护您在使用本应用过程中提供的个人信息，以及您对这些信息所享有的权利。请您在使用本应用前仔细阅读并充分理解本政策的全部内容，尤其是加粗的条款。如您对本政策有任何疑问、意见或建议，可通过本政策末尾提供的联系方式与我们联系。</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">一、我们收集的信息</h2>
    <p className="mb-4 text-trad-paper/80">在您使用本应用的过程中，我们会收集以下信息，以提供、维护和改进我们的服务：</p>
    <ol className="list-decimal pl-6 mb-6 space-y-3">
      <li className="text-trad-paper/80"><strong>求签记录</strong>：您在使用本应用过程中产生的<strong>抽签记录、签文收藏、黄历浏览历史</strong>等。这些数据是本应用的核心功能内容，用于为您提供求签模拟、收藏管理、黄历查询等服务。</li>
      <li className="text-trad-paper/80"><strong>设备信息</strong>：为了保障应用的稳定运行和优化用户体验，我们会自动收集您的设备相关信息，包括但不限于<strong>设备型号、操作系统版本、设备标识符（如IMEI/Android ID）、IP地址</strong>等。</li>
    </ol>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">二、我们如何使用收集的信息</h2>
    <p className="mb-4 text-trad-paper/80">我们仅会在以下合法、正当、必要的范围内使用您的个人信息：</p>
    <ol className="list-decimal pl-6 mb-6 space-y-3">
      <li className="text-trad-paper/80"><strong>提供和改进服务</strong>：使用您的求签记录来实现抽签、收藏、历史记录等核心功能；通过分析设备信息和使用数据，优化应用性能，修复已知问题，提升用户体验。</li>
      <li className="text-trad-paper/80"><strong>数据分析和统计</strong>：在对您的个人信息进行匿名化或去标识化处理后，进行内部数据分析和统计，以了解用户群体的使用习惯和需求，从而更好地规划和改进产品功能。</li>
    </ol>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">三、我们如何共享、转让和公开披露信息</h2>
    <p className="mb-4 text-trad-paper/80">我们郑重承诺，严格保护您的个人信息，不会在以下情形之外向任何第三方共享、转让或公开披露您的信息：</p>
    <ol className="list-decimal pl-6 mb-6 space-y-3">
      <li className="text-trad-paper/80"><strong>法定情形</strong>：根据法律法规的规定、行政或司法机关的强制性要求，我们可能会向有关部门披露您的相关信息。</li>
      <li className="text-trad-paper/80"><strong>获得明确同意</strong>：在获得您的明确书面同意后，我们才会向第三方共享您的个人信息。</li>
      <li className="text-trad-paper/80"><strong>业务必要且合规</strong>：为了实现本政策第二条所述的目的，我们可能会与提供技术支持、支付服务或其他必要服务的合作伙伴共享必要的信息，但我们会要求其严格遵守本政策及相关法律法规，并对您的信息承担保密义务。</li>
    </ol>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">四、我们如何存储和保护信息</h2>
    <ol className="list-decimal pl-6 mb-6 space-y-3">
      <li className="text-trad-paper/80"><strong>本地存储为主</strong>：您的求签记录、收藏等数据主要存储在您的设备本地（浏览器缓存）。我们不会将您的个人数据上传至服务器。</li>
      <li className="text-trad-paper/80"><strong>安全措施</strong>：我们采用符合行业标准的技术手段和安全管理措施来保护您的个人信息，包括但不限于数据加密、访问控制、安全审计等，以防止信息泄露、丢失、篡改或被未经授权的访问。</li>
    </ol>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">五、您的权利</h2>
    <p className="mb-4 text-trad-paper/80">根据相关法律法规，您对您的个人信息享有以下权利：</p>
    <ol className="list-decimal pl-6 mb-6 space-y-3">
      <li className="text-trad-paper/80"><strong>访问权</strong>：您可以随时在本应用中查看您的求签记录和收藏内容。</li>
      <li className="text-trad-paper/80"><strong>删除权</strong>：您可以随时删除单条收藏记录或清空全部历史记录，应用将立即删除相关数据。</li>
      <li className="text-trad-paper/80"><strong>数据导出</strong>：本应用数据存储在您的设备本地，您可以通过清除浏览器缓存等方式管理您的数据。</li>
    </ol>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">六、未成年人保护</h2>
    <p className="mb-6 text-trad-paper/80">我们非常重视对未成年人个人信息的保护。如您是未满14周岁的未成年人，在使用本应用前，应在监护人的指导下仔细阅读本政策，并征得监护人的同意。如我们发现自己在未事先获得监护人可验证同意的情况下收集了未成年人的个人信息，将立即删除相关数据。</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">七、本政策的更新</h2>
    <p className="mb-6 text-trad-paper/80">我们可能会根据法律法规的更新、业务的调整或技术的发展，适时对本隐私政策进行修订。修订后的政策将在本应用内显著位置公示，并在生效前通过合理方式通知您。如您继续使用本应用，即表示您同意接受修订后的政策。</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">八、免责声明</h2>
    <p className="mb-6 text-trad-paper/80">本应用所提供的内容均源自传统文献及算法模拟，仅供娱乐与趣味探索。请以科学价值观为准绳，理性参考。本应用不对求签结果、黄历解读的准确性做任何保证。</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 border-b-2 border-trad-gold/30 pb-2 text-trad-yellow">九、联系我们</h2>
    <p className="mb-4 text-trad-paper/80">如您对本隐私政策有任何疑问、意见或建议，或需要行使您的相关权利，请通过以下方式与我们联系：</p>
    <div className="bg-trad-dark/40 p-4 rounded-lg border border-trad-gold/20 mb-6">
      <p className="text-trad-paper/80"><strong>电子邮箱</strong>：Jp112022@163.com</p>
    </div>

    <div className="mt-8 pt-6 border-t border-trad-gold/30 text-center">
      <p className="mb-2 text-trad-paper/50">感谢您使用灵序求签！</p>
      <p className="mb-4 text-trad-paper/30">我们致力于为您提供安全、便捷的求签祈福服务。</p>
      <p className="text-sm text-trad-paper/20">© 2026 光年跃迁（温州）科技有限公司 版权所有</p>
    </div>
  </div>
);

export const UserAgreementContent = () => (
  <div className="max-w-none text-trad-paper">
    <h1 className="text-2xl font-bold text-trad-gold text-center mb-4 font-serif tracking-wider">用户服务协议</h1>
    <p className="text-center text-trad-paper/50 mb-8">更新日期：2026年05月19日</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 text-trad-yellow">1. 协议的接受</h2>
    <p className="text-trad-paper/80 mb-4">欢迎使用「灵序求签」应用（以下简称「本应用」）。</p>
    <p className="text-trad-paper/80 mb-4">本协议是您与本应用开发者之间关于使用本应用的法律协议。</p>
    <p className="text-trad-paper/80 mb-6">通过下载、安装或使用本应用，您表示同意接受本协议的全部条款和条件。</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 text-trad-yellow">2. 服务内容</h2>
    <p className="text-trad-paper/80 mb-4">本应用提供以下服务：</p>
    <ul className="list-disc pl-6 space-y-2 mb-6">
      <li className="text-trad-paper/80">模拟求签功能（姻缘、事业、健康等签类）</li>
      <li className="text-trad-paper/80">每日黄历查询（宜忌、财神方位等）</li>
      <li className="text-trad-paper/80">签文收藏与管理</li>
      <li className="text-trad-paper/80">民俗常识参考</li>
    </ul>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 text-trad-yellow">3. 用户义务</h2>
    <p className="text-trad-paper/80 mb-4">作为本应用的用户，您同意：</p>
    <ul className="list-disc pl-6 space-y-2 mb-6">
      <li className="text-trad-paper/80">遵守本协议的所有条款</li>
      <li className="text-trad-paper/80">不使用本应用进行任何非法活动</li>
      <li className="text-trad-paper/80">本应用仅供娱乐，不构成任何实际指导</li>
    </ul>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 text-trad-yellow">4. 知识产权</h2>
    <p className="text-trad-paper/80 mb-6">本应用的所有内容，包括但不限于文字、图像、图标等，均受知识产权法律保护。未经许可，不得复制、修改、分发或商业使用本应用的任何内容。</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 text-trad-yellow">5. 免责声明</h2>
    <p className="text-trad-paper/80 mb-4">本应用按「原样」提供，不做任何形式的保证。</p>
    <ul className="list-disc pl-6 space-y-2 mb-6">
      <li className="text-trad-paper/80">本应用仅供娱乐，不构成任何实际指导</li>
      <li className="text-trad-paper/80">求签结果为程序随机模拟，不代表任何吉凶判断</li>
      <li className="text-trad-paper/80">黄历内容源自传统文献，仅供参考</li>
    </ul>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 text-trad-yellow">6. 终止</h2>
    <p className="text-trad-paper/80 mb-6">您可以随时停止使用本应用。清除本地数据后，所有本地存储的信息将被删除。</p>

    <h2 className="text-xl font-serif font-semibold mt-8 mb-4 text-trad-yellow">7. 适用法律</h2>
    <p className="text-trad-paper/80 mb-6">本协议受中华人民共和国法律管辖。</p>

    <div className="mt-8 pt-6 border-t border-trad-gold/30 text-center">
      <p className="mb-2 text-trad-paper/50">感谢您使用灵序求签！</p>
      <p className="text-sm text-trad-paper/30">传承传统文化，科学面对生活</p>
    </div>
  </div>
);

interface DeclineModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeclineModal = ({ onCancel, onConfirm }: DeclineModalProps) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-110">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-trad-red rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border-2 border-trad-gold flex flex-col"
    >
      <div className="flex-1 p-6">
        <h2 className="text-xl font-serif font-bold text-trad-yellow mb-4">确认拒绝</h2>
        <p className="text-trad-paper/80 mb-6">您确定要拒绝用户协议与隐私政策吗？拒绝后将无法使用我们的服务。</p>
      </div>
      <div className="flex border-t border-trad-gold/30">
        <button
          onClick={onCancel}
          className="flex-1 py-4 text-center text-trad-paper font-medium hover:bg-trad-dark/50 transition-colors"
        >
          取消
        </button>
        <div className="w-px bg-trad-gold/30"></div>
        <button
          onClick={onConfirm}
          className="flex-1 py-4 text-center text-trad-gold font-medium hover:bg-trad-dark/50 transition-colors"
        >
          确定
        </button>
      </div>
    </motion.div>
  </div>
);