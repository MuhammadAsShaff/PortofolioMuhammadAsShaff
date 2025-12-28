# Portfolio Muhammad As Shaff - Dokumentasi Lengkap

## 📋 Daftar Isi
- [Gambaran Umum](#gambaran-umum)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Project](#struktur-project)
- [Instalasi dan Setup](#instalasi-dan-setup)
- [Fitur Utama](#fitur-utama)
- [Komponen Utama](#komponen-utama)
- [State Management](#state-management)
- [Styling dan Tema](#styling-dan-tema)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Gambaran Umum

Portfolio interaktif yang meniru tampilan dan nuansa macOS, dibangun dengan SvelteKit. Website ini menampilkan:
- **Desktop Mode**: Pengalaman desktop macOS lengkap dengan windows, dock, dan menu bar
- **Mobile Mode**: Tampilan "Mini Desktop" yang responsif dengan iOS-style home screen

### Demo
- **Live Site**: [URL Portfolio Anda]
- **Repository**: https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff

---

## 🛠 Teknologi yang Digunakan

### Core Framework
- **SvelteKit** - Framework utama
- **TypeScript** - Type safety
- **Vite** - Build tool

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Untuk styling khusus macOS

### Animasi
- **GSAP (GreenSock)** - Animasi kompleks (dock magnification, hero text effects)

### Fonts
- **Georama** - Font utama untuk hero text
- **Roboto Mono** - Font monospace untuk terminal

---

## 📁 Struktur Project

```
portofolio-muhammad-as-shaff/
│
├── src/
│   ├── lib/
│   │   ├── components/          # Semua komponen UI
│   │   │   ├── desktop/         # Komponen untuk desktop view
│   │   │   │   ├── Desktop.svelte
│   │   │   │   ├── Dock.svelte
│   │   │   │   ├── MenuBar.svelte
│   │   │   │   └── DesktopIcon.svelte
│   │   │   │
│   │   │   ├── mobile/          # Komponen untuk mobile view
│   │   │   │   ├── MobileWrapper.svelte
│   │   │   │   ├── MobileHome.svelte
│   │   │   │   ├── MobileWork.svelte
│   │   │   │   ├── MobileSafari.svelte
│   │   │   │   ├── MobilePhotos.svelte
│   │   │   │   ├── MobileContact.svelte
│   │   │   │   └── MobileTerminal.svelte
│   │   │   │
│   │   │   └── windows/         # Window components
│   │   │       ├── WindowShell.svelte
│   │   │       ├── FinderWindow.svelte
│   │   │       ├── SafariWindow.svelte
│   │   │       ├── PhotosWindow.svelte
│   │   │       ├── ContactWindow.svelte
│   │   │       ├── TerminalWindow.svelte
│   │   │       ├── ResumeWindow.svelte
│   │   │       └── AboutWindow.svelte
│   │   │
│   │   ├── data/                # Data dan konfigurasi
│   │   │   ├── content.ts       # Konten utama (nav, dock, blog)
│   │   │   ├── fileSystem.ts    # Struktur file system
│   │   │   ├── blog.ts          # Data blog posts
│   │   │   └── photos.ts        # Data galeri foto
│   │   │
│   │   ├── stores/              # Svelte stores untuk state management
│   │   │   ├── windowStore.ts   # State untuk windows
│   │   │   ├── themeStore.ts    # State untuk dark/light mode
│   │   │   └── mobileNavStore.ts # State untuk mobile navigation
│   │   │
│   │   └── assets/              # Asset statis
│   │       └── favicon.svg
│   │
│   ├── routes/                  # SvelteKit routes
│   │   ├── +page.svelte         # Halaman utama
│   │   ├── +layout.svelte       # Layout wrapper
│   │   └── layout.css           # Global styles
│   │
│   ├── app.html                 # HTML template
│   └── app.d.ts                 # TypeScript declarations
│
├── static/                      # Static assets
│   ├── images/                  # Gambar (icons, wallpaper, dll)
│   └── icons/                   # Icon SVG
│
├── .vscode/                     # VSCode settings
├── package.json                 # Dependencies
├── svelte.config.js             # Svelte configuration
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # Project readme
```

---

## 🚀 Instalasi dan Setup

### Prerequisites
- Node.js (v18 atau lebih tinggi)
- npm atau pnpm

### Langkah Instalasi

1. **Clone repository**
```bash
git clone https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff.git
cd portofolio-muhammad-as-shaff
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan development server**
```bash
npm run dev
```

4. **Buka browser**
```
http://localhost:5173
```

### Build untuk Production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## ✨ Fitur Utama

### 1. Desktop Mode (≥640px)

#### Menu Bar
- **Waktu real-time** - Menampilkan jam yang update setiap detik
- **Navigation links** - Projects, Contact, Resume
- **Theme toggle** - Switch antara light/dark mode dengan dropdown
- **Status icons** - WiFi, search icons

#### Desktop Icons
- **Draggable** - Icon bisa dipindah-pindah
- **Click to open** - Membuka window yang sesuai
- **Auto-save position** - Posisi icon tersimpan di localStorage

#### Hero Text Animation
- **Character-by-character bolding** - Efek bold pada setiap karakter saat cursor mendekat
- **Elliptical proximity** - Radius horizontal lebih lebar, vertical lebih ketat
- **Pure GSAP control** - Animasi smooth tanpa konflik CSS

#### Dock
- **Magnification effect** - Icon membesar saat hover (GSAP)
- **Active indicator** - Dot di bawah app yang sedang terbuka
- **Tooltips** - Nama app muncul saat hover
- **Applications**:
  - Finder (Portfolio)
  - Safari (Articles/Blog)
  - Photos (Gallery)
  - Contact
  - Terminal (Skills)
  - Trash (Archive)

#### Windows System
- **Draggable windows** - Bisa dipindah-pindah
- **Window controls** - Close, minimize, maximize buttons
- **Multiple windows** - Bisa buka beberapa window sekaligus
- **Z-index management** - Window yang diklik muncul di depan
- **Window types**:
  - **Finder**: File system browser dengan sidebar
  - **Safari**: Blog posts dengan search
  - **Photos**: Gallery dengan grid layout
  - **Contact**: Social media links
  - **Terminal**: Tech stack list
  - **Resume**: PDF viewer
  - **About**: Info pribadi

### 2. Mobile Mode (<640px)

#### Home Screen (Mini Desktop)
- **iOS-style status bar** - Time, Dynamic Island, WiFi, Battery
- **Top app icons** - Resume (Pages), Terminal
- **Hero text** - Centered portfolio title
- **Dock** - 4 apps (Finder, Safari, Photos, Contact)
- **Responsive sizing** - Menggunakan viewport units (vw, vh, dvh)
- **Safe area support** - Otomatis menghindari browser navigation

#### Mobile Pages
- **MobileWork**: Portfolio projects
- **MobileSafari**: Blog articles
- **MobilePhotos**: Image gallery
- **MobileContact**: Contact information
- **MobileTerminal**: Skills list
- **MobileResume**: PDF resume viewer

#### Navigation
- **Back button** - Kembali ke home
- **Smooth transitions** - Animasi saat berpindah page

---

## 🧩 Komponen Utama

### Desktop Components

#### `Desktop.svelte`
**Lokasi**: `src/lib/components/desktop/Desktop.svelte`

**Fungsi**: Komponen utama desktop yang mengatur semua elemen desktop

**Fitur**:
- Boot screen animation
- Desktop background
- Icon management
- Window rendering
- Hero text animation dengan GSAP

**Props**: Tidak ada (menggunakan stores)

**Key Code**:
```typescript
// Character-based proximity effect
const distance = Math.hypot(
  (e.clientX - rect.left - rect.width / 2) * 0.35,
  e.clientY - rect.top - rect.height / 2
);
```

#### `Dock.svelte`
**Lokasi**: `src/lib/components/desktop/Dock.svelte`

**Fungsi**: Dock macOS dengan magnification effect

**Props**:
```typescript
interface Props {
  items: DockItem[];
}
```

**Key Features**:
- GSAP magnification on hover
- Active app indicators
- Tooltips

#### `MenuBar.svelte`
**Lokasi**: `src/lib/components/desktop/MenuBar.svelte`

**Fungsi**: Menu bar di bagian atas

**Features**:
- Real-time clock
- Navigation menu
- Theme toggle dropdown

#### `WindowShell.svelte`
**Lokasi**: `src/lib/components/windows/WindowShell.svelte`

**Fungsi**: Wrapper untuk semua window dengan controls

**Props**:
```typescript
interface Props {
  id: string;
  title: string;
  children: Snippet;
}
```

**Features**:
- Draggable
- Window controls (close, minimize, maximize)
- Z-index management

### Mobile Components

#### `MobileHome.svelte`
**Lokasi**: `src/lib/components/mobile/MobileHome.svelte`

**Fungsi**: Home screen mobile dengan Mini Desktop aesthetic

**Key Features**:
- Dynamic viewport height (`dvh`)
- Responsive icon sizing dengan viewport units
- Safe area inset support
- Live clock

**Key Code**:
```svelte
<!-- Dynamic Viewport Height -->
<div class="h-dvh min-h-dvh">
  <!-- Content automatically fits above browser UI -->
</div>
```

#### `MobileWrapper.svelte`
**Lokasi**: `src/lib/components/mobile/MobileWrapper.svelte`

**Fungsi**: Router untuk mobile pages

**Logic**:
```typescript
{#if $mobileNav.page === 'home'}
  <MobileHome />
{:else if $mobileNav.page === 'work'}
  <MobileWork />
{/if}
```

---

## 🗄 State Management

### Window Store (`windowStore.ts`)

**Lokasi**: `src/lib/stores/windowStore.ts`

**Fungsi**: Mengelola state semua windows

**State**:
```typescript
interface Window {
  id: string;
  type: string;
  title: string;
  minimized: boolean;
  zIndex: number;
  data?: any;
}
```

**Actions**:
- `openWindow(type, title, data)` - Buka window baru
- `closeWindow(id)` - Tutup window
- `minimizeWindow(id)` - Minimize window
- `focusWindow(id)` - Bring window to front

### Theme Store (`themeStore.ts`)

**Lokasi**: `src/lib/stores/themeStore.ts`

**Fungsi**: Mengelola dark/light mode

**State**:
```typescript
type Theme = 'light' | 'dark';
```

**Persistence**: Tersimpan di localStorage

### Mobile Nav Store (`mobileNavStore.ts`)

**Lokasi**: `src/lib/stores/mobileNavStore.ts`

**Fungsi**: Mengelola navigasi mobile

**State**:
```typescript
interface MobileNav {
  page: string;
  data?: any;
}
```

**Actions**:
- `goTo(page, data)` - Navigate ke page
- `goBack()` - Kembali ke home

---

## 🎨 Styling dan Tema

### Tailwind Configuration

**File**: `tailwind.config.js`

**Custom Classes**:
- Responsive breakpoints
- Custom colors
- Custom spacing
- Font families

### CSS Variables

**File**: `src/routes/layout.css`

**Variables**:
```css
:root {
  --font-georama: 'Georama', sans-serif;
  --font-roboto: 'Roboto Mono', monospace;
}
```

### Dark Mode

**Implementation**: Class-based dengan Tailwind

**Toggle**: Via `themeStore`

**Persistence**: localStorage

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import project di Vercel
3. Deploy otomatis

### Netlify

1. Build command: `npm run build`
2. Publish directory: `build`
3. Deploy

### Manual

```bash
npm run build
# Upload folder 'build' ke hosting
```

---

## 🐛 Troubleshooting

### Issue: Dock tertutup browser navigation di mobile

**Solusi**: Gunakan `dvh` (dynamic viewport height)
```svelte
<div class="h-dvh min-h-dvh">
```

### Issue: Icon tidak bisa di-drag

**Solusi**: Check `pointer-events` pada parent containers
```svelte
<div class="pointer-events-none">
  <div class="pointer-events-auto">
    <!-- Icon here -->
  </div>
</div>
```

### Issue: GSAP animation tidak smooth

**Solusi**: Hapus CSS transitions yang konflik
```svelte
<!-- REMOVE -->
<p class="transition-all">

<!-- USE -->
<p>
  <!-- GSAP will handle animation -->
</p>
```

### Issue: Favicon tidak muncul

**Solusi**: 
1. Check `app.html` viewport meta tag
2. Pastikan `favicon.png` ada di `static/`
3. Hard refresh browser (Ctrl+F5)

---

## 📝 Catatan Pengembangan

### Best Practices

1. **Gunakan Svelte 5 Runes**
   ```typescript
   let count = $state(0);
   let doubled = $derived(count * 2);
   ```

2. **Responsive dengan Viewport Units**
   ```css
   width: 20vw;
   height: 100dvh;
   ```

3. **Safe Area untuk Mobile**
   ```css
   padding-bottom: env(safe-area-inset-bottom);
   ```

4. **GSAP untuk Animasi Kompleks**
   ```typescript
   gsap.to(element, { scale: 1.5, duration: 0.3 });
   ```

### Performance Tips

- Lazy load images
- Minimize bundle size
- Use `$derived` instead of `$effect` when possible
- Optimize GSAP animations dengan `overwrite: 'auto'`

---

## 👨‍💻 Kontributor

**Muhammad As Shaff**
- GitHub: [@MuhammadAsShaff](https://github.com/MuhammadAsShaff)
- Portfolio: [URL Portfolio]

---

## 📄 License

MIT License - Silakan gunakan untuk project pribadi atau komersial

---

## 🙏 Credits

- Design inspiration: macOS Big Sur
- Reference: [JSM Portfolio](https://jsmfolio.netlify.app/)
- Icons: Custom SVG icons
- Fonts: Google Fonts (Georama, Roboto Mono)

---

**Last Updated**: 28 Desember 2024
