# Chai 的个人主页

公开地址：https://hsjv-chai.github.io/

一个轻量、无第三方运行依赖的静态作品集。暖纸色与鼠尾草绿、原创 SVG 山水插画、响应式项目展示，支持深浅主题、项目分类、键盘导航与减少动效偏好。

## 本地预览

需要 Node.js 22 或更高版本，无需安装依赖。

```sh
npm run build
npm run dev
```

打开 http://127.0.0.1:4173。

## 修改内容

- `data/projects.json`：项目名称、介绍、分类和 GitHub 仓库名。只收录公开项目；内容为人工整理，不依赖访客实时访问 GitHub API。
- `src/index.html`：个人介绍、导航、联系方式及 SEO 文案。
- `src/styles.css`：颜色、排版与响应式布局。
- `public/landscape.svg`：原创矢量山水背景。

项目分类为 `desktop`、`web`、`experiment`。添加项目后运行 `npm run build`，数量和卡片由构建脚本生成。项目实际可用平台与状态以各仓库 README 为准。所有项目卡片直接打开相应公开仓库。

## 发布

仓库的 GitHub Pages Source 配置为 GitHub Actions。推送至 `main` 自动构建 `dist/` 并通过 `.github/workflows/pages.yml` 发布，支持手动运行工作流。

设计参考 maorx.cn 的自然氛围与单页叙事。页面代码、插画、图标与文案独立制作，未使用参考站的代码、图片或个人资料。
