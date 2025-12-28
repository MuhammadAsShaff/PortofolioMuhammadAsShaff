<script lang="ts">
    import { mobileNav } from '$lib/stores/mobileNavStore';
    
    // Top Left Apps (Mini Desktop style)
    const desktopApps = [
         { id: 'resume', name: 'Resume', icon: '/images/notes.png', bg: 'bg-[#FFCC00]', type: 'img', label: 'Resume' },
         { id: 'terminal', name: 'Skills', icon: '/images/terminal.png', bg: 'bg-black', type: 'img', label: 'Terminal' },
    ];
    
    // Bottom Dock Apps
    const dockApps = [
         { id: 'work', icon: '/images/finder.png', bg: 'bg-transparent', label: 'Portfolio' }, 
         { id: 'safari', icon: '/images/safari.png', bg: 'bg-white', label: 'Articles' },
         { id: 'photos', icon: '/images/photos.png', bg: 'bg-white', label: 'Gallery' },
         { id: 'contact', icon: '/images/contact.png', bg: 'bg-transparent', label: 'Contact' },
    ];
    
    function launch(id: string) {
        if (id === 'resume') {
             mobileNav.goTo('work', { path: 'root-resume' });
        } else {
             // @ts-ignore
             mobileNav.goTo(id);
        }
    }
</script>

<div class="h-screen w-full bg-cover bg-center flex flex-col justify-between overflow-hidden relative font-sans select-none text-white" 
     style="background-image: url('/images/wallpaper.png');">
     
     <!-- Overlay for readability if needed (light tint) -->
     <div class="absolute inset-0 bg-black/10 pointer-events-none z-0"></div>

    <!-- Status Bar -->
    <div class="h-12 w-full flex items-center justify-between px-6 pt-2 font-medium z-20 relative text-sm tracking-wide">
        <span class="w-16">4:20 PM</span>
        
        <!-- Dynamic Island / Notch -->
        <div class="h-[32px] w-[120px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-center shadow-lg">
             <!-- Camera bump -->
             <div class="w-2 h-2 rounded-full bg-[#1a1a1a] ml-[70px] border border-[#333]"></div>
        </div>
        
        <div class="flex items-center gap-1.5 w-16 justify-end">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7 0-3.86 3.14-7 7-7s7 3.14 7 7c0 3.86-3.14 7-7 7z" /></svg>
            <div class="w-5 h-[10px] rounded-[3px] border border-white flex items-center p-0.5 relative ml-1">
                <div class="h-full w-full bg-white rounded-[1px]"></div>
            </div>
        </div>
    </div>
    
    <!-- Desktop Area (Icons & Text) -->
    <div class="flex-1 px-6 pt-12 z-10 w-full relative">
        
        <!-- Top Left Icons -->
        <div class="flex gap-5">
            {#each desktopApps as app}
                <button class="flex flex-col items-center gap-1.5 group focus:outline-none" onclick={() => launch(app.id)}>
                    <div class="w-[72px] h-[72px] rounded-[18px] shadow-2xl active:scale-95 transition-transform relative overflow-hidden bg-black/5 ring-1 ring-white/10">
                        {#if app.id === 'resume'}
                             <!-- Visual approximation of orange notes icon -->
                             <div class="w-full h-full bg-[#ffad2a] flex items-center justify-center bg-gradient-to-br from-[#ffc845] to-[#ff9f0a]">
                                 <span class="text-4xl drop-shadow-sm filter brightness-110">📝</span>
                             </div>
                        {:else if app.id === 'terminal'}
                             <div class="w-full h-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center bg-gradient-to-b from-[#2c2c2e] to-[#000000]">
                                 <span class="text-3xl font-mono text-white/90 font-bold">>_</span>
                             </div>
                        {:else}
                             <img src={app.icon} alt={app.label} class="w-full h-full object-cover" />
                        {/if}
                    </div>
                </button>
            {/each}
        </div>

        <!-- Hero Text (Centered) -->
        <div class="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 text-white">
             <p class="text-[17px] font-light tracking-wide mb-0 opacity-80 mix-blend-overlay">
                Hey, I'm Muhammad As Shaff! welcome to my
             </p>
             <h1 class="text-[58px] leading-none font-bold italic tracking-tighter drop-shadow-lg opacity-95" style="font-family: 'Georama', sans-serif;">
                portfolio.
             </h1>
        </div>

    </div>
    
    <!-- Mobile Dock Area -->
    <div class="w-full relative px-4 pb-9 z-10 flex flex-col items-center">
        <!-- Glass Dock: Taller, Darker, More Rounded -->
        <div class="w-full h-[96px] max-w-[350px] bg-white/10 backdrop-blur-2xl rounded-[32px] px-5 flex items-center justify-between shadow-2xl border border-white/10 ring-1 ring-white/5">
             {#each dockApps as app}
                <button class="w-[64px] h-[64px] rounded-[15px] flex items-center justify-center active:scale-90 transition-transform focus:outline-none relative group" onclick={() => launch(app.id)}>
                     <img src={app.icon} alt={app.label} class="w-full h-full object-contain drop-shadow-lg filter brightness-105" draggable="false" />
                </button>
            {/each}
        </div>
    </div>
</div>
