
<script lang="ts">
   import { onMount } from 'svelte';
   import gsap from 'gsap';
   import MenuBar from './MenuBar.svelte';
   import Dock from './Dock.svelte';
   import DesktopIcon from './DesktopIcon.svelte';
   
   import FinderWindow from '$lib/components/windows/FinderWindow.svelte';
   import TextWindow from '$lib/components/windows/TextWindow.svelte';
   import ResumeWindow from '$lib/components/windows/ResumeWindow.svelte';
   import SafariWindow from '$lib/components/windows/SafariWindow.svelte';
   import PhotosWindow from '$lib/components/windows/PhotosWindow.svelte';
   import AboutWindow from '$lib/components/windows/AboutWindow.svelte';
   import ContactWindow from '$lib/components/windows/ContactWindow.svelte';
   import TerminalWindow from '$lib/components/windows/TerminalWindow.svelte';

   import { windowStore } from '$lib/stores/windowStore';
   import { theme } from '$lib/stores/themeStore';
   import { locations, dockApps as dockItemsData } from '$lib/data/content';
   
   // Map locations keys to desktop icons
   let desktopIcons = $state([
       { 
           id: locations.resume.type, 
           name: locations.resume.name, 
           icon: '/images/pdf.png', 
           action: () => openWindow(locations.resume.type, locations.resume.name, 'resume', { src: '/resume.pdf' }),
           pos: { x: 20, y: 40 } 
       },
       { 
           id: locations.work.type, 
           name: locations.work.name, 
           icon: '/images/folder.png', 
           action: () => openWindow(locations.work.type, locations.work.name, 'finder', { folderId: 'root-work', content: locations.work.children }),
           pos: { x: 20, y: 180 } 
       },
       { 
           id: locations.about.type, 
           name: locations.about.name, 
           icon: '/images/folder.png', 
           folderType: 'blue',
           action: () => openWindow(locations.about.type, locations.about.name, 'about', { content: locations.about.children }),
           pos: { x: 20, y: 320 } 
       },
       // Add specific projects as shortcuts if desired, or keep them inside 'Work'
   ]);

   // Dock items from data
   let dockItems = dockItemsData.map(item => ({
       ...item,
       action: () => {
           if (item.canOpen) {
               openWindow(item.id, item.name, item.id);
           }
       }
   }));

   function openWindow(id: string, title: string, type: any, data?: any) {
       windowStore.openWindow({ id, title, type, data });
   }
   
   // Use state for references
   let bootScreen = $state<HTMLDivElement>();
   let progressBar = $state<HTMLDivElement>();
   let desktopContent = $state<HTMLDivElement>();
   let titleChars: HTMLElement[] = $state([]);
   let subtitleChars: HTMLElement[] = $state([]);
   let showingBoot = $state(true);

   onMount(() => {
       console.log("Desktop mounted");
       // Safety rendering
       if(desktopContent) desktopContent.style.opacity = '1';
       if(bootScreen) bootScreen.style.display = 'none'; // Force hide boot screen for now to debug

       try {
           if (bootScreen && progressBar && desktopContent) {
               // Simple fade in for now to rule out complex timeline issues
               gsap.to(desktopContent, { opacity: 1, duration: 1 });
           }
       } catch (error) {
           console.error("GSAP Error:", error);
           // Fallback
           if (bootScreen) bootScreen.style.display = 'none';
           if (desktopContent) desktopContent.style.opacity = '1';
       }
   });

   // Apply theme
   $effect(() => {
       if ($theme === 'dark') document.documentElement.classList.add('dark');
       else document.documentElement.classList.remove('dark');
   });
   
   function getIconType(iconStr: string) {
       // Return raw string if it's a path
       if (iconStr.startsWith('/') || iconStr.startsWith('http')) return iconStr;
       return iconStr;
   }
   
   function getFolderVariant(iconStr: string): string | undefined {
       // All folders use image now, no variant
       return undefined;
   }
</script>

<div class="fixed inset-0 overflow-hidden select-none">
    {#if showingBoot}
    <div 
        bind:this={bootScreen}
        class="absolute inset-0 z-50 bg-black text-white flex flex-col items-center justify-center pointer-events-none"
    >
        <div class="mb-4">
             <!-- Apple Logo SVG Inline to be safe -->
             <svg class="w-24 h-24 text-white fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.79-1.31.02-2.3-1.23-3.14-2.47-1.71-2.45-3.03-6.93-1.26-10.03 1.05-1.84 3.01-1.66 2.05-3 1.66-2.03-.03-3.12 1.48-4.07 1.48L11.3 7.6c1.1-1.39 2.76-1.25 3.63-1.25.04 0 .19-1.39.19-1.39 1.25.09 3.07.66 4.67 2.41-.83.6-2.03 1.58-2.03 3.8.03 2.98 2.34 4.09 3.14 4.09-.06.4-.97 3.34-2.19 5.24zM15.52 5.09c.66-.79 1.1-1.89 1.1-2.98 0-.15-.02-.3-.04-.45-.96.04-2.14.65-2.83 1.46-.61.72-1.15 1.86-1.15 2.92 0 .18.04.36.06.45 1.06.08 2.14-.54 2.86-1.4z" />
             </svg>
        </div>
        <div class="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
             <div bind:this={progressBar} class="h-full bg-white w-0 rounded-full"></div>
        </div>
    </div>
    {/if}

    <!-- Desktop Environment -->
    <div 
        bind:this={desktopContent}
        class="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out font-sans opacity-100"
        style="background-image: url('/images/wallpaper.png');"
    >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/0 pointer-events-none transition-colors duration-500 {$theme === 'dark' ? 'bg-black/40' : ''}"></div>

       <!-- Desktop Content -->
       <MenuBar />

       <!-- Icons -->
       <div class="absolute top-10 left-0 bottom-24 w-full pointer-events-none z-0">
           <div id="desktop-area" class="pointer-events-auto w-full h-full relative">
               
                <!-- Hero Text -->
                <div 
                    class="hidden lg:flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none text-white/95 drop-shadow-lg z-0 mix-blend-overlay w-full h-full"
                    onmousemove={(e) => {
                        const { clientX, clientY } = e;
                        
                        // Animate Characters of "portfolio."
                        titleChars.forEach((char) => {
                            if (!char) return;
                            const rect = char.getBoundingClientRect();
                            const charCenterX = rect.left + rect.width / 2;
                            const charCenterY = rect.top + rect.height / 2;
                            
                            // Optimized: Elliptical distance (Horizontal range is wider)
                            // We multiply X delta by 0.35, so the mouse can be roughly 3x further horizontally
                            // while maintaining the same vertical sensitivity ("atas bawah pas")
                            const dist = Math.hypot((clientX - charCenterX) * 0.35, clientY - charCenterY);
                            
                            // Optimized: Use a slightly longer duration for smoothness on low-end devices
                            // Reduced radius to 120 to isolate effect
                            const targetWeight = gsap.utils.clamp(100, 800, gsap.utils.mapRange(0, 120, 800, 100, dist));
                            
                            gsap.to(char, { 
                                fontWeight: targetWeight, 
                                duration: 0.5, // Smoother transition
                                ease: 'power2.out',
                                overwrite: 'auto'
                            });
                        });

                        // Animate Subtitle Characters
                        subtitleChars.forEach((char) => {
                            if (!char) return;
                            const rect = char.getBoundingClientRect();
                            const charCenterX = rect.left + rect.width / 2;
                            const charCenterY = rect.top + rect.height / 2;
                            
                            // Wide horizontal range (ellipse)
                            const dist = Math.hypot((clientX - charCenterX) * 0.35, clientY - charCenterY);
                            
                            // Proximity radius for Y remains effectively ~60px
                            // X radius is effectively ~170px
                            const targetWeight = gsap.utils.clamp(100, 600, gsap.utils.mapRange(0, 60, 600, 100, dist));
                             
                            gsap.to(char, { 
                                fontWeight: targetWeight, 
                                duration: 0.5, 
                                ease: 'power2.out',
                                overwrite: 'auto'
                            });
                        });
                    }}
                    onmouseleave={() => {
                        titleChars.forEach(char => {
                            if(char) gsap.to(char, { fontWeight: 100, duration: 0.8, ease: 'power2.out' });
                        });
                        subtitleChars.forEach(char => {
                            if(char) gsap.to(char, { fontWeight: 100, duration: 0.8, ease: 'power2.out' });
                        });
                    }}
                    role="application"
                >
                    <p 
                        class="text-3xl md:text-4xl font-thin opacity-90 mb-0 tracking-wide whitespace-pre-wrap leading-normal"
                    >
                        {#each "Hey, I'm Muhammad As Shaff! welcome to my".split("") as char, i}
                            <span 
                                bind:this={subtitleChars[i]}
                                class="inline-block"
                            >
                                {char}
                            </span>
                        {/each}
                    </p>
                    <h1 
                        class="text-[120px] leading-tight font-thin tracking-tighter italic cursor-default whitespace-pre-wrap"
                        style="font-variation-settings: 'wght' 100;"
                    >
                        {#each "portfolio.".split("") as char, i}
                            <span 
                                bind:this={titleChars[i]}
                                class="inline-block"
                            >
                                {char}
                            </span>
                        {/each}
                    </h1>
                </div>

               {#each desktopIcons as icon, i}
                   <DesktopIcon 
                       id={icon.id}
                       name={icon.name}
                       icon={getIconType(icon.icon)}
                       folderType={icon.folderType}
                       onclick={icon.action}
                       initialPos={icon.pos}
                   />
               {/each}
           </div>
       </div>
       
       <!-- Windows Layer -->
       <div class="absolute inset-0 z-10 pointer-events-none">
           <div class="relative w-full h-full pointer-events-none">
                {#each $windowStore as win (win.id)}
                    {#if win.type === 'finder'}
                        <FinderWindow id={win.id} title={win.title} data={win.data} />
                    {:else if win.type === 'text'}
                        <TextWindow id={win.id} title={win.title} data={win.data} />
                    {:else if win.type === 'resume'}
                        <ResumeWindow id={win.id} title={win.title} data={win.data} />
                    {:else if win.type === 'safari'}
                        <SafariWindow id={win.id} title={win.title} data={win.data} />
                    {:else if win.type === 'photos'}
                        <PhotosWindow id={win.id} title={win.title} />
                    {:else if win.type === 'about'}
                        <AboutWindow id={win.id} title={win.title} />
                    {:else if win.type === 'contact'}
                        <ContactWindow id={win.id} title={win.title} />
                    {:else if win.type === 'terminal'}
                        <TerminalWindow id={win.id} title={win.title} />
                    {/if}
                {/each}
           </div>
       </div>

       <!-- Dock -->
       <Dock items={dockItems} />
    </div>
</div>
