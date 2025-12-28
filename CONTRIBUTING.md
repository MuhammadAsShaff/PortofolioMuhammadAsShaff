# Contributing to Portfolio Muhammad As Shaff

Terima kasih atas minat Anda untuk berkontribusi! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

- Bersikap sopan dan profesional
- Hormati pendapat orang lain
- Fokus pada konstruktif feedback
- Bantu newcomers

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm atau pnpm
- Git
- Code editor (VSCode recommended)

### Setup Development Environment

1. **Fork repository**
   ```bash
   # Click "Fork" button di GitHub
   ```

2. **Clone fork Anda**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PortofolioMuhammadAsShaff.git
   cd portofolio-muhammad-as-shaff
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 💻 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `style/` - UI/styling changes
- `test/` - Adding tests

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments untuk logic yang kompleks
- Update documentation jika perlu

### 3. Test Your Changes

```bash
# Run development server
npm run dev

# Test di berbagai screen sizes
# - Desktop (≥640px)
# - Mobile (<640px)

# Test dark/light mode
# Test semua interactive features
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork di GitHub
2. Click "Pull Request"
3. Isi description dengan detail
4. Submit PR

## 📝 Coding Standards

### TypeScript

```typescript
// ✅ Good
interface WindowData {
  id: string;
  title: string;
  type: string;
}

// ❌ Bad
const data: any = { ... };
```

### Svelte 5 Runes

```typescript
// ✅ Good - Use runes
let count = $state(0);
let doubled = $derived(count * 2);

// ❌ Bad - Old syntax
let count = 0;
$: doubled = count * 2;
```

### Component Structure

```svelte
<script lang="ts">
  // 1. Imports
  import Component from './Component.svelte';
  
  // 2. Props
  interface Props {
    title: string;
  }
  let { title }: Props = $props();
  
  // 3. State
  let count = $state(0);
  
  // 4. Derived
  let doubled = $derived(count * 2);
  
  // 5. Functions
  function handleClick() {
    count++;
  }
  
  // 6. Effects
  $effect(() => {
    console.log(count);
  });
</script>

<!-- 7. Template -->
<div>
  <h1>{title}</h1>
  <button onclick={handleClick}>
    Count: {count}
  </button>
</div>

<!-- 8. Styles (if needed) -->
<style>
  /* Component-specific styles */
</style>
```

### Tailwind CSS

```svelte
<!-- ✅ Good - Responsive classes -->
<div class="w-full sm:w-1/2 lg:w-1/3">

<!-- ✅ Good - Viewport units untuk mobile -->
<div class="w-[20vw] h-[20vw] max-w-[80px]">

<!-- ❌ Bad - Fixed pixel values -->
<div class="w-[72px] h-[72px]">
```

### File Naming

- Components: `PascalCase.svelte` (e.g., `MobileHome.svelte`)
- Utilities: `camelCase.ts` (e.g., `windowStore.ts`)
- Data files: `camelCase.ts` (e.g., `fileSystem.ts`)

### Comments

```typescript
// ✅ Good - Explain WHY
// Use elliptical distance for wider horizontal range
const distance = Math.hypot(dx * 0.35, dy);

// ❌ Bad - Explain WHAT (code is self-explanatory)
// Calculate distance
const distance = Math.hypot(dx, dy);
```

## 📦 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(mobile): add dynamic viewport height support"

# Bug fix
git commit -m "fix(dock): resolve icon magnification issue on hover"

# Documentation
git commit -m "docs: update README with deployment instructions"

# Refactor
git commit -m "refactor(desktop): simplify hero text animation logic"
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit first line to 72 characters
- Reference issues/PRs when applicable

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review of code
- [ ] Comments added untuk complex logic
- [ ] Documentation updated (if needed)
- [ ] Tested di desktop dan mobile
- [ ] Tested dark/light mode
- [ ] No console errors atau warnings

### PR Title Format

```
<type>: <description>
```

Examples:
- `feat: add mobile safe area support`
- `fix: resolve dock positioning issue`
- `docs: improve installation guide`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested dark mode
- [ ] Tested light mode

## Related Issues
Closes #issue_number
```

### Review Process

1. Maintainer akan review PR Anda
2. Mungkin ada request untuk changes
3. Make requested changes
4. PR akan di-merge jika approved

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues
- Try latest version
- Reproduce bug consistently

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Screen size: [e.g. 1920x1080]
- Device: [e.g. Desktop/Mobile]

**Additional context**
Any other information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want

**Describe alternatives you've considered**
Other solutions you've thought about

**Additional context**
Mockups, examples, etc.
```

## 📚 Resources

### Documentation
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP](https://greensock.com/docs/)

### Tools
- [Svelte DevTools](https://github.com/sveltejs/svelte-devtools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## ❓ Questions?

- Open an issue dengan label `question`
- Email: [your-email@example.com]
- Discord: [Your Discord]

## 🙏 Thank You!

Terima kasih telah berkontribusi untuk project ini! 

Setiap kontribusi, sekecil apapun, sangat berarti. 💖

---

**Happy Coding!** 🚀
