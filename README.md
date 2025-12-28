# 🎨 Portfolio Muhammad As Shaff

Portfolio interaktif dengan tampilan macOS yang dibangun menggunakan SvelteKit, Tailwind CSS, dan GSAP.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## ✨ Fitur Utama

- 🖥️ **Desktop Mode**: Pengalaman macOS lengkap dengan windows, dock, dan menu bar
- 📱 **Mobile Mode**: Tampilan "Mini Desktop" responsif dengan iOS-style home screen
- 🌓 **Dark/Light Mode**: Toggle tema dengan smooth transition
- ⚡ **Animasi Smooth**: GSAP untuk dock magnification dan hero text effects
- 📂 **File System**: Navigasi folder dan file seperti Finder
- 🎯 **Fully Responsive**: Otomatis menyesuaikan dengan ukuran layar

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff.git

# Masuk ke folder project
cd portofolio-muhammad-as-shaff

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser di `http://localhost:5173`

## 📦 Tech Stack

- **Framework**: SvelteKit + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: GSAP (GreenSock)
- **Fonts**: Georama, Roboto Mono
- **Build Tool**: Vite

## 📁 Struktur Project

```
src/
├── lib/
│   ├── components/
│   │   ├── desktop/      # Desktop components
│   │   ├── mobile/       # Mobile components
│   │   └── windows/      # Window components
│   ├── data/             # Content & configuration
│   ├── stores/           # State management
│   └── assets/           # Static assets
├── routes/               # SvelteKit routes
└── app.html              # HTML template

static/
├── images/               # Images & wallpapers
└── icons/                # SVG icons
```

## 🎯 Fitur Desktop

- **Draggable Icons**: Pindahkan icon ke posisi manapun
- **Multiple Windows**: Buka beberapa window sekaligus
- **Dock Magnification**: Efek zoom saat hover
- **Hero Text Animation**: Karakter bold saat cursor mendekat
- **Real-time Clock**: Jam yang update setiap detik

## 📱 Fitur Mobile

- **Dynamic Viewport**: Otomatis menyesuaikan dengan browser UI
- **Touch-friendly**: Icon dan button berukuran optimal
- **Smooth Navigation**: Transisi halus antar page
- **Safe Area Support**: Menghindari notch dan navigation bar

## 🛠️ Development

### Build untuk production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Format code

```bash
npm run format
```

### Lint code

```bash
npm run lint
```

## 📖 Dokumentasi Lengkap

Lihat [DOCUMENTATION.md](./DOCUMENTATION.md) untuk:
- Penjelasan detail setiap komponen
- State management guide
- Styling dan theming
- Troubleshooting
- Best practices

## 🎨 Customization

### Mengubah Konten

Edit file di `src/lib/data/`:
- `content.ts` - Navigation, dock apps, blog posts
- `fileSystem.ts` - File system structure
- `photos.ts` - Gallery images

### Mengubah Tema

Edit `src/routes/layout.css` untuk custom colors dan variables.

### Menambah Window Baru

1. Buat component di `src/lib/components/windows/`
2. Import di `Desktop.svelte`
3. Tambahkan case di window rendering logic

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff)

### Netlify

1. Build command: `npm run build`
2. Publish directory: `build`

## 🐛 Known Issues & Solutions

**Dock tertutup browser navigation di mobile?**
- Sudah fixed dengan `dvh` (dynamic viewport height)

**Icon tidak bisa di-drag?**
- Check `pointer-events` pada parent containers

**GSAP animation tidak smooth?**
- Hapus CSS transitions yang konflik dengan GSAP

## 🤝 Contributing

Contributions, issues, dan feature requests sangat diterima!

1. Fork project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - lihat [LICENSE](LICENSE) untuk detail

## 👨‍💻 Author

**Muhammad As Shaff**

- GitHub: [@MuhammadAsShaff](https://github.com/MuhammadAsShaff)
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]

## 🙏 Acknowledgments

- Design inspiration: macOS Big Sur
- Reference: [JSM Portfolio](https://jsmfolio.netlify.app/)
- Icons: Custom SVG icons
- Community: SvelteKit Discord

---

⭐ Jika project ini membantu, jangan lupa kasih star!

**Made with ❤️ using SvelteKit**
