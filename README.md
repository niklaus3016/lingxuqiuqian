<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 灵序求签 🧧

一款基于 React + Vite + Capacitor 构建的传统祈福求签应用。传承传统文化，科学面对生活。

## ✨ 功能特性

- **抽签祈福** - 四大签类（姻缘、事业、健康、运势），心诚则灵
- **每日黄历** - 查看宜忌、财神方位，顺天时而行
- **签文收藏** - 保存您的灵签结果，随时回顾
- **民俗常识** - 积累风水小常识，提升生活品质
- **用户协议** - 首次使用展示隐私政策与用户协议弹窗

## 📱 版本信息

- 当前版本：1.0
- 更新日期：2026年5月20日

## 🛠️ 技术栈

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Capacitor 8 (Android)
- Motion React (动画)

## 🚀 快速开始

**Prerequisites:** Node.js >= 20

### 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 设置环境变量（可选）：
   - 创建 `.env.local` 文件
   - 添加 `GEMINI_API_KEY=your-api-key`（如使用 AI 功能）

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

### Android 构建

```bash
# 构建 Web 应用
npm run build

# 同步到 Android
npx cap sync android

# 打开 Android Studio
npx cap open android
```

## 📁 项目结构

```
src/
├── components/     # React 组件
│   ├── agreement/  # 用户协议与隐私政策
│   ├── almanac/    # 黄历功能
│   ├── favorites/  # 收藏管理
│   ├── fortune/    # 抽签功能
│   ├── guide/      # 新手引导
│   ├── home/       # 首页
│   └── settings/   # 设置页面
├── data/           # 数据文件
├── lib/            # 工具函数
├── services/       # 业务服务
└── types/          # TypeScript 类型定义
```

## 📜 许可证

本应用仅供娱乐，不构成任何实际指导。传承传统文化，科学面对生活。

---

> **温馨提示**：本应用所提供内容均源自传统文献及算法模拟，仅供娱乐与趣味探索。请以科学价值观为准绳，理性参考。