# AskDiary

基于 React + Vite + pnpm + Tailwind CSS + Axios 的现代前端项目

## 技术栈

- ⚛️ **React 18** - 用户界面库
- ⚡ **Vite** - 下一代前端构建工具
- 📦 **pnpm** - 快速、节省磁盘空间的包管理器
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🌐 **Axios** - 基于 Promise 的 HTTP 客户端
- 📝 **TypeScript** - 类型安全的 JavaScript

## 前置要求

- Node.js 18+
- pnpm 8+

如果您还没有安装 pnpm，可以运行：

```bash
npm install -g pnpm
```

## 快速开始

1. 安装依赖：

```bash
pnpm install
```

2. 启动开发服务器：

```bash
pnpm dev
```

3. 构建生产版本：

```bash
pnpm build
```

4. 预览生产构建：

```bash
pnpm preview
```

## 项目结构

```
AskDiary/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 功能特性

- 🔥 热模块替换 (HMR)
- 📱 响应式设计
- 🌙 暗色主题支持
- 🎯 TypeScript 支持
- 🎨 Tailwind CSS 样式
- 📡 Axios HTTP 请求
- ✅ ESLint 代码检查

## 开发说明

### 添加新组件

在 `src/components/` 目录下创建新的 React 组件：

```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
```

### 使用 Axios 发送请求

```tsx
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    console.log(response.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};
```

### Tailwind CSS 使用

项目已配置好 Tailwind CSS，可以直接使用实用类：

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
  按钮
</div>
```

## 部署

### Vercel

```bash
pnpm build
# 将 dist 目录部署到 Vercel
```

### Netlify

```bash
pnpm build
# 将 dist 目录部署到 Netlify
```

## 许可证

MIT

---

🚀 快乐编码！
