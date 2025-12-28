# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- [ ] Add blog post detail pages
- [ ] Implement project detail modals
- [ ] Add contact form functionality
- [ ] Optimize image loading
- [ ] Add unit tests

## [1.0.0] - 2024-12-28

### Added
- ✨ Complete macOS-style desktop interface
- ✨ Mobile "Mini Desktop" view with iOS aesthetic
- ✨ Dynamic viewport height (dvh) support for mobile
- ✨ GSAP animations for dock magnification
- ✨ Character-by-character hero text animation
- ✨ Draggable desktop icons with position persistence
- ✨ Multiple window system with z-index management
- ✨ Dark/light theme toggle with persistence
- ✨ Real-time clock in menu bar and mobile status bar
- ✨ File system browser (Finder)
- ✨ Blog posts viewer (Safari)
- ✨ Photo gallery (Photos)
- ✨ Contact links (Contact)
- ✨ Skills list (Terminal)
- ✨ PDF resume viewer
- ✨ Responsive design for all screen sizes

### Desktop Features
- **Menu Bar**
  - Real-time clock
  - Navigation links (Projects, Contact, Resume)
  - Theme toggle dropdown
  - Status icons (WiFi, Search)
  
- **Desktop Icons**
  - Draggable with threshold detection
  - Auto-save position to localStorage
  - Click to open windows
  
- **Hero Text**
  - Character-based proximity effect
  - Elliptical interaction zone
  - Pure GSAP animation control
  - Independent effects for title and subtitle
  
- **Dock**
  - GSAP magnification on hover
  - Active app indicators
  - Tooltips with app names
  - 6 applications (Finder, Safari, Photos, Contact, Terminal, Trash)
  
- **Windows**
  - Draggable windows
  - Window controls (close, minimize, maximize)
  - Multiple windows support
  - Z-index management
  - 7 window types (Finder, Safari, Photos, Contact, Terminal, Resume, About)

### Mobile Features
- **Home Screen**
  - iOS-style status bar with Dynamic Island
  - Live clock
  - WiFi and battery indicators
  - Top app icons (Resume, Terminal)
  - Centered hero text
  - Bottom dock with 4 apps
  
- **Responsive Design**
  - Viewport units (vw, vh, dvh)
  - Safe area inset support
  - Touch-friendly icon sizes
  - Smooth page transitions
  
- **Mobile Pages**
  - MobileWork (Portfolio)
  - MobileSafari (Blog)
  - MobilePhotos (Gallery)
  - MobileContact (Contact info)
  - MobileTerminal (Skills)
  - MobileResume (PDF viewer)

### Technical
- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Animation**: GSAP for complex animations
- **State Management**: Svelte 5 runes and stores
- **Fonts**: Georama, Roboto Mono from Google Fonts
- **Build Tool**: Vite

### Fixed
- 🐛 Dock positioning on mobile browsers
- 🐛 Icon drag threshold to prevent accidental moves
- 🐛 Hero text rendering artifacts
- 🐛 CSS/GSAP animation conflicts
- 🐛 Favicon not loading
- 🐛 Desktop icon click events blocked by overlay
- 🐛 Mobile home screen not rendering
- 🐛 Browser navigation covering dock

### Changed
- 🔄 Migrated to Svelte 5 runes syntax
- 🔄 Improved responsive design with viewport units
- 🔄 Optimized GSAP animations for performance
- 🔄 Simplified mobile navigation logic
- 🔄 Enhanced theme toggle UX

### Removed
- ❌ Static pixel values in favor of viewport units
- ❌ Conflicting CSS transitions
- ❌ Unused emoji fallbacks for icons
- ❌ Redundant boot screen elements

## [0.5.0] - 2024-12-20

### Added
- Initial desktop layout
- Basic window system
- Dock implementation
- Menu bar
- Theme toggle

### Known Issues
- Mobile view not optimized
- Dock covered by browser navigation on mobile
- Hero text animation has artifacts

## [0.1.0] - 2024-12-15

### Added
- Project initialization
- SvelteKit setup
- Tailwind CSS configuration
- Basic routing structure

---

## Version History Summary

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2024-12-28 | Full release with desktop and mobile support |
| 0.5.0 | 2024-12-20 | Desktop features implementation |
| 0.1.0 | 2024-12-15 | Initial project setup |

---

## Migration Guides

### Upgrading to 1.0.0

If you're using an older version:

1. **Update dependencies**
   ```bash
   npm install
   ```

2. **Update Svelte syntax to runes**
   ```typescript
   // Old
   let count = 0;
   $: doubled = count * 2;
   
   // New
   let count = $state(0);
   let doubled = $derived(count * 2);
   ```

3. **Update mobile viewport**
   ```svelte
   <!-- Old -->
   <div class="h-screen">
   
   <!-- New -->
   <div class="h-dvh">
   ```

4. **Clear localStorage** (optional, for fresh start)
   ```javascript
   localStorage.clear();
   ```

---

## Deprecation Notices

### Deprecated in 1.0.0
- None

### Removed in 1.0.0
- Old Svelte 4 syntax (replaced with Svelte 5 runes)
- Static pixel sizing (replaced with viewport units)

---

## Contributors

- **Muhammad As Shaff** - Initial work and main development

---

## Links

- [Repository](https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff)
- [Issues](https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff/issues)
- [Pull Requests](https://github.com/MuhammadAsShaff/PortofolioMuhammadAsShaff/pulls)

---

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/) format and uses [Semantic Versioning](https://semver.org/).
