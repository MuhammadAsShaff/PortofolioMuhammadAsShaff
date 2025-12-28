# 📂 Project Structure

Dokumentasi lengkap struktur folder dan file dalam project ini.

## 🌳 Tree Structure

```
portofolio-muhammad-as-shaff/
│
├── 📄 Configuration Files
│   ├── .env.example              # Environment variables template
│   ├── .eslintrc.json            # ESLint configuration
│   ├── .gitignore                # Git ignore rules
│   ├── .npmrc                    # npm configuration
│   ├── .prettierignore           # Prettier ignore rules
│   ├── .prettierrc               # Prettier configuration
│   ├── eslint.config.js          # ESLint config (new flat format)
│   ├── package.json              # Dependencies and scripts
│   ├── package-lock.json         # Locked dependencies
│   ├── svelte.config.js          # SvelteKit configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── vite.config.ts            # Vite build configuration
│
├── 📚 Documentation
│   ├── README.md                 # Quick start guide
│   ├── DOCUMENTATION.md          # Complete documentation
│   ├── CONTRIBUTING.md           # Contributing guidelines
│   ├── CHANGELOG.md              # Version history
│   ├── LICENSE                   # MIT License
│   └── PROJECT_STRUCTURE.md      # This file
│
├── 🎨 Source Code (src/)
│   │
│   ├── 📱 Application Core
│   │   ├── app.d.ts              # TypeScript app declarations
│   │   └── app.html              # HTML template
│   │
│   ├── 🧩 Components (lib/components/)
│   │   │
│   │   ├── 🖥️ Desktop Components (desktop/)
│   │   │   ├── Desktop.svelte           # Main desktop container
│   │   │   ├── Dock.svelte              # macOS-style dock
│   │   │   ├── MenuBar.svelte           # Top menu bar
│   │   │   └── DesktopIcon.svelte       # Desktop icons
│   │   │
│   │   ├── 📱 Mobile Components (mobile/)
│   │   │   ├── MobileWrapper.svelte     # Mobile router
│   │   │   ├── MobileHome.svelte        # Home screen
│   │   │   ├── MobileWork.svelte        # Projects page
│   │   │   ├── MobileSafari.svelte      # Blog page
│   │   │   ├── MobilePhotos.svelte      # Gallery page
│   │   │   ├── MobileContact.svelte     # Contact page
│   │   │   ├── MobileTerminal.svelte    # Skills page
│   │   │   └── MobileResume.svelte      # Resume viewer
│   │   │
│   │   └── 🪟 Window Components (windows/)
│   │       ├── WindowShell.svelte       # Window wrapper
│   │       ├── FinderWindow.svelte      # File browser
│   │       ├── SafariWindow.svelte      # Blog viewer
│   │       ├── PhotosWindow.svelte      # Photo gallery
│   │       ├── ContactWindow.svelte     # Contact info
│   │       ├── TerminalWindow.svelte    # Skills terminal
│   │       ├── ResumeWindow.svelte      # PDF viewer
│   │       ├── AboutWindow.svelte       # About me
│   │       ├── TextWindow.svelte        # Text file viewer
│   │       └── ImageWindow.svelte       # Image viewer
│   │
│   ├── 📊 Data (lib/data/)
│   │   ├── content.ts            # Main content (nav, dock, blog)
│   │   ├── fileSystem.ts         # File system structure
│   │   ├── blog.ts               # Blog posts data
│   │   └── photos.ts             # Gallery images data
│   │
│   ├── 🗄️ State Management (lib/stores/)
│   │   ├── windowStore.ts        # Window state management
│   │   ├── themeStore.ts         # Theme (dark/light) state
│   │   └── mobileNavStore.ts     # Mobile navigation state
│   │
│   ├── 🎨 Assets (lib/assets/)
│   │   └── favicon.svg           # Favicon source
│   │
│   ├── 🛣️ Routes (routes/)
│   │   ├── +page.svelte          # Main page
│   │   ├── +layout.svelte        # Root layout
│   │   └── layout.css            # Global styles
│   │
│   └── lib/index.ts              # Library exports
│
├── 🖼️ Static Assets (static/)
│   │
│   ├── images/                   # Images and graphics
│   │   ├── wallpaper.png         # Desktop background
│   │   ├── finder.png            # Finder icon
│   │   ├── safari.png            # Safari icon
│   │   ├── photos.png            # Photos icon
│   │   ├── contact.png           # Contact icon
│   │   ├── terminal.png          # Terminal icon
│   │   ├── trash.png             # Trash icon
│   │   ├── folder.png            # Folder icon
│   │   ├── pdf.png               # PDF icon
│   │   ├── pages.png             # Pages icon
│   │   ├── blog1.png             # Blog post image 1
│   │   ├── blog2.png             # Blog post image 2
│   │   ├── blog3.png             # Blog post image 3
│   │   └── ...                   # Other images
│   │
│   ├── icons/                    # SVG icons
│   │   ├── wifi.svg              # WiFi icon
│   │   ├── search.svg            # Search icon
│   │   ├── user.svg              # User icon
│   │   ├── mode.svg              # Theme toggle icon
│   │   └── ...                   # Other icons
│   │
│   ├── favicon.png               # Website favicon
│   └── resume.pdf                # Resume PDF file
│
├── 🔧 Build Output (.svelte-kit/)
│   └── [Generated files]         # Auto-generated, don't edit
│
├── 📦 Dependencies (node_modules/)
│   └── [Installed packages]      # Auto-generated
│
└── 🎯 VSCode Settings (.vscode/)
    └── settings.json             # Editor settings
```

---

## 📝 File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `.env.example` | Template untuk environment variables |
| `eslint.config.js` | Konfigurasi linting rules |
| `.gitignore` | File yang diabaikan Git |
| `.prettierrc` | Code formatting rules |
| `package.json` | Dependencies dan npm scripts |
| `svelte.config.js` | SvelteKit adapter dan preprocessor |
| `tailwind.config.js` | Tailwind CSS customization |
| `tsconfig.json` | TypeScript compiler options |
| `vite.config.ts` | Vite build tool configuration |

### Source Files

#### Desktop Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| `Desktop.svelte` | Main desktop container | Boot animation, icon management, window rendering |
| `Dock.svelte` | macOS-style dock | GSAP magnification, active indicators, tooltips |
| `MenuBar.svelte` | Top menu bar | Real-time clock, navigation, theme toggle |
| `DesktopIcon.svelte` | Desktop icons | Draggable, position persistence, click to open |

#### Mobile Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| `MobileWrapper.svelte` | Mobile router | Page navigation, back button |
| `MobileHome.svelte` | Home screen | Status bar, hero text, dock, dynamic viewport |
| `MobileWork.svelte` | Projects page | Project list, filtering |
| `MobileSafari.svelte` | Blog page | Article list, search |
| `MobilePhotos.svelte` | Gallery page | Image grid, lightbox |
| `MobileContact.svelte` | Contact page | Social links, contact info |
| `MobileTerminal.svelte` | Skills page | Tech stack list |
| `MobileResume.svelte` | Resume viewer | PDF display |

#### Window Components

| Component | Description | Window Type |
|-----------|-------------|-------------|
| `WindowShell.svelte` | Window wrapper | Provides controls, dragging |
| `FinderWindow.svelte` | File browser | Folder navigation, file preview |
| `SafariWindow.svelte` | Blog viewer | Article list, search bar |
| `PhotosWindow.svelte` | Photo gallery | Grid layout, categories |
| `ContactWindow.svelte` | Contact info | Social media links |
| `TerminalWindow.svelte` | Skills terminal | Tech stack display |
| `ResumeWindow.svelte` | PDF viewer | Resume display |
| `AboutWindow.svelte` | About me | Personal info |
| `TextWindow.svelte` | Text viewer | Plain text display |
| `ImageWindow.svelte` | Image viewer | Image preview |

#### Data Files

| File | Content |
|------|---------|
| `content.ts` | Navigation links, dock apps, blog posts |
| `fileSystem.ts` | Folder structure, file metadata |
| `blog.ts` | Blog post data (title, date, image, link) |
| `photos.ts` | Gallery images (src, alt, category) |

#### Stores

| Store | Purpose | Persistence |
|-------|---------|-------------|
| `windowStore.ts` | Window state (open, minimized, z-index) | No |
| `themeStore.ts` | Dark/light mode | localStorage |
| `mobileNavStore.ts` | Mobile page navigation | No |

---

## 🎯 Key Directories

### `/src/lib/components/`
Semua UI components, diorganisir berdasarkan platform:
- `desktop/` - Desktop-specific components
- `mobile/` - Mobile-specific components
- `windows/` - Window content components

### `/src/lib/data/`
Static data dan configuration:
- Content untuk navigation, dock, blog
- File system structure
- Gallery images metadata

### `/src/lib/stores/`
Svelte stores untuk state management:
- Window management
- Theme preferences
- Mobile navigation

### `/static/`
Static assets yang di-serve langsung:
- Images (wallpapers, icons, photos)
- PDF files
- Favicon

---

## 🔄 Data Flow

```
User Interaction
      ↓
Component Event Handler
      ↓
Store Update (if needed)
      ↓
Reactive Statement ($derived)
      ↓
UI Re-render
```

### Example: Opening a Window

```
1. User clicks dock icon
2. Dock.svelte calls openWindow()
3. windowStore adds new window
4. Desktop.svelte reactively renders window
5. Window appears on screen
```

### Example: Theme Toggle

```
1. User clicks theme button
2. MenuBar.svelte calls theme.toggle()
3. themeStore updates value
4. localStorage saves preference
5. Document class updates
6. CSS variables change
7. UI re-renders with new theme
```

---

## 📦 Build Process

```
Source Files (src/)
      ↓
Vite Processing
      ↓
SvelteKit Compilation
      ↓
Tailwind CSS Processing
      ↓
TypeScript Compilation
      ↓
Build Output (build/)
      ↓
Deployment
```

---

## 🎨 Asset Organization

### Images Naming Convention
- `{type}-{number}.png` - e.g., `blog-1.png`, `photo-2.png`
- `{app-name}.png` - e.g., `finder.png`, `safari.png`
- `{purpose}.png` - e.g., `wallpaper.png`, `favicon.png`

### Icons Naming Convention
- `{name}.svg` - e.g., `wifi.svg`, `search.svg`, `mode.svg`
- Lowercase, hyphen-separated
- SVG format untuk scalability

---

## 🔍 Finding Files

### Need to change...

**Content (text, links, data)**
→ `/src/lib/data/`

**Desktop UI**
→ `/src/lib/components/desktop/`

**Mobile UI**
→ `/src/lib/components/mobile/`

**Window content**
→ `/src/lib/components/windows/`

**Global styles**
→ `/src/routes/layout.css`

**Images**
→ `/static/images/`

**Icons**
→ `/static/icons/`

**Configuration**
→ Root directory config files

---

## 📊 File Count Summary

| Category | Count |
|----------|-------|
| Components | ~20 |
| Data files | 4 |
| Stores | 3 |
| Routes | 2 |
| Config files | 10+ |
| Documentation | 6 |
| Static assets | 30+ |

---

## 🔗 Related Documentation

- [README.md](./README.md) - Quick start guide
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Complete documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributing guidelines
- [CHANGELOG.md](./CHANGELOG.md) - Version history

---

**Last Updated**: 28 Desember 2024
