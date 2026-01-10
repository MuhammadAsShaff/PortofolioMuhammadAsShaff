<script lang="ts">
    import { mobileNav } from '$lib/stores/mobileNavStore';
    import { onMount } from 'svelte';
    
    // Top Left Apps (Mini Desktop style)
    const desktopApps = [
         { id: 'about-me', name: 'About Me', icon: '/images/txt.png', bg: 'bg-transparent', type: 'img', label: 'About Me' },
         { id: 'resume-work', name: 'Curriculum Vitae', icon: '/images/pdf.png', bg: 'bg-transparent', type: 'img', label: 'CV' },
         { id: 'projects', name: 'Projects', icon: '/images/folder.png', bg: 'bg-white', type: 'img', label: 'Projects' },
         { id: 'internships', name: 'Internships', icon: '/images/folder.png', bg: 'bg-white', type: 'img', label: 'Internships' },
         { id: 'awards', name: 'Awards', icon: '/images/folder.png', bg: 'bg-white', type: 'img', label: 'Awards' },
         { id: 'certificates', name: 'Certificates', icon: '/images/folder.png', bg: 'bg-white', type: 'img', label: 'Certificates' },
         { id: 'organizations', name: 'Organizations', icon: '/images/folder.png', bg: 'bg-white', type: 'img', label: 'Org.' },
         { id: 'terminal', name: 'Skills', icon: '/images/txt.png', bg: 'bg-transparent', type: 'img', label: 'Skills' },
    ];
    
    // Bottom Dock Apps
    const dockApps = [
         { id: 'work', icon: '/images/finder.png', bg: 'bg-transparent', label: 'Portfolio' }, 
         { id: 'safari', icon: '/images/safari.png', bg: 'bg-white', label: 'Articles' },
         { id: 'photos', icon: '/images/photos.png', bg: 'bg-white', label: 'Gallery' },
         { id: 'contact', icon: '/images/contact.png', bg: 'bg-transparent', label: 'Contact' },
    ];
    
    // Live Clock
    let currentTime = $state('');
    
    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        currentTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
    
    onMount(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });
    
    function launch(id: string) {
        if (id === 'terminal') {
             mobileNav.goTo('tech');
        } else if (id === 'about-me') {
             mobileNav.goTo('about');
        } else if (id === 'resume-work') {
             mobileNav.goTo('document', {});
        } else if (dockApps.some(a => a.id === id)) {
             if (id === 'work') {
                 mobileNav.goTo('work', { path: 'root' });
             } else {
                 // @ts-ignore
                 mobileNav.goTo(id);
             }
        } else {
             // Assume folder/item for Work app
             mobileNav.goTo('work', { path: id });
        }
    }
</script>

<!-- Mobile Container: Full viewport height with proper flex layout -->
<div class="min-h-dvh h-dvh w-full bg-cover bg-center flex flex-col relative font-sans select-none text-white overflow-hidden" 
     style="background-image: url('/images/wallpaper.png');">
     
     <!-- Overlay -->
     <div class="absolute inset-0 bg-black/10 pointer-events-none"></div>

    <!-- Status Bar: Responsive height and spacing -->
    <header class="relative z-20 flex items-center justify-between px-[4vw] pt-safe h-[8vh] min-h-[48px] max-h-[60px]">
        <!-- Time -->
        <time class="text-[3.5vw] sm:text-sm font-semibold min-w-[15vw]">{currentTime}</time>
        
        <!-- Dynamic Island -->
        <div class="absolute left-1/2 top-2 -translate-x-1/2 h-[6vw] w-[28vw] max-h-8 max-w-[120px] bg-black rounded-full shadow-lg flex items-center justify-center">
             <div class="w-[1.5vw] h-[1.5vw] max-w-2 max-h-2 rounded-full bg-[#1a1a1a] ml-[16vw] sm:ml-16 border border-[#333]"></div>
        </div>
        
        <!-- Status Icons -->
        <div class="flex items-center gap-[2vw] sm:gap-2 min-w-[15vw] justify-end">
            <img src="/icons/wifi.svg" alt="WiFi" class="w-[3.5vw] h-[3.5vw] max-w-4 max-h-4 dark:invert" />
            <div class="w-[5vw] h-[2.5vw] max-w-5 max-h-2.5 rounded-sm border border-white flex items-center p-0.5">
                <div class="h-full w-full bg-white rounded-[1px]"></div>
            </div>
        </div>
    </header>
    
    <!-- Main Content Area: Flexible center section -->
    <main class="flex-1 relative z-10 flex flex-col px-[4vw] pt-[4vh]">
        
        <!-- Top App Icons: Responsive grid -->
        <!-- Top App Icons: Responsive grid -->
        <div class="grid grid-cols-4 gap-x-[3vw] gap-y-[4vw] sm:gap-6 justify-items-center">
            {#each desktopApps as app}
                <button 
                    class="group focus:outline-none active:scale-95 transition-transform flex flex-col items-center gap-1"
                    onclick={() => launch(app.id)}
                >
                    <!-- Larger icons, no stroke -->
                    <div class="w-[16vw] h-[16vw] max-w-[64px] max-h-[64px] rounded-[3.5vw] sm:rounded-[16px] shadow-sm {app.bg || ''}  overflow-hidden flex items-center justify-center">
                         <img 
                            src={app.icon} 
                            alt={app.label} 
                            class="w-full h-full object-contain drop-shadow-xl {(app.id === 'resume-work' || app.id === 'terminal') ? '' : 'p-[2vw] sm:p-2.5'}" 
                         />
                    </div>
                    <span class="text-[3vw] sm:text-xs font-medium text-white drop-shadow-md">{app.label}</span>
                </button>
            {/each}
        </div>

        <!-- Hero Text: Centered with viewport-based sizing -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-[6vw]">
             <p class="text-[3.8vw] sm:text-base md:text-lg font-light tracking-wide mb-1 opacity-80">
                Hey, I'm Muhammad As Shaff! welcome to my
             </p>
             <h1 class="text-[13vw] sm:text-[11vw] md:text-6xl leading-[0.9] font-bold italic tracking-tighter drop-shadow-lg" style="font-family: 'Georama', sans-serif;">
                portfolio.
             </h1>
        </div>

    </main>
    
    <!-- Dock Area: Fixed bottom with dynamic viewport -->
    <footer class="relative z-10 w-full flex justify-center px-[3vw] pb-[5vw] sm:pb-5">
        <!-- Dock Container: Fully responsive -->
        <div class="w-full max-w-[92vw] sm:max-w-md h-[23vw] max-h-[110px] bg-white/10 backdrop-blur-2xl rounded-[7vw] sm:rounded-[32px] px-[4vw] sm:px-5 flex items-center justify-evenly shadow-2xl border border-white/10 mb-[2vw] sm:mb-2">
             {#each dockApps as app}
                <button 
                    class="w-[17vw] h-[17vw] max-w-[75px] max-h-[75px] rounded-[3.5vw] sm:rounded-[16px] flex items-center justify-center active:scale-90 transition-transform focus:outline-none group"
                    onclick={() => launch(app.id)}
                >
                     <img 
                        src={app.icon} 
                        alt={app.label} 
                        class="w-full h-full object-contain drop-shadow-lg" 
                        draggable="false" 
                     />
                </button>
            {/each}
        </div>
    </footer>
</div>
