
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
   import { fileSystemList } from '$lib/data/fileSystem';
   
   // Map locations keys to desktop icons
   /**
    * DESKTOP ICON LOGIC
    * Generates the list of icons to display on the desktop based on the file system.
    */
   let desktopIcons = $state(
       fileSystemList.map((item, i) => {
           // Grid layout: Calculate position (6 rows per column)
           const col = Math.floor(i / 6);
           const row = i % 6;
           
           // Determine the icon image to use
           let iconPath = item.icon;
           if (!iconPath) {
                if (item.type === 'folder') iconPath = '/images/folder.png';
                else if (item.name.endsWith('.pdf')) iconPath = '/images/pdf.png';
                else if (item.type === 'link') iconPath = '/images/safari.png';
                else iconPath = '/images/txt.png';
           }

           return {
               id: item.id,
               name: item.name,
               icon: iconPath,
               action: () => handleIconClick(item), // Simplified click handler
               pos: { x: 20 + (col * 110), y: 40 + (row * 100) },
               folderType: undefined as string | undefined
           };
       })
   );

   /**
    * HANDLE ICON CLICKS
    * Determines which window to open based on the type of item clicked.
    */
   function handleIconClick(item: any) {
       if (item.type === 'folder') {
           // Open a Finder window for folders
           openWindow(item.id, item.name, 'finder', { folderId: item.id });
       } 
       else if (item.type === 'link') {
           // Open Safari for web links
           openWindow(item.id, item.name, 'safari', { url: item.content });
       } 
       else if (item.type === 'file') {
           // Handle specific file types
           if (item.name.endsWith('.pdf')) {
               openWindow(item.id, item.name, 'resume', { src: item.content });
           } else if (item.metadata?.fileType === 'doc') {
                openWindow(item.id, item.name, 'resume', { docData: item.metadata.docData });
           } else if (item.metadata?.fileType === 'image') {
               openWindow(item.id, item.name, 'photos', { filter: item.id });
           } else {
               // Default to text viewer for other files
                // Special check for "About Us" to open the custom About window if preferred,
                // otherwise it opens as a text file.
               openWindow(item.id, item.name, 'text', { content: item.content, image: item.metadata?.image });
           }
       }
   }

   /**
    * HERO TEXT ANIMATION
    * Handles the interactive font-weight animation when hovering over the title.
    */
   function handleHeroMouseMove(e: MouseEvent) {
        const { clientX, clientY } = e;
        
        // Animate Characters of "portfolio."
        titleChars.forEach((char) => {
            if (!char) return;
            const rect = char.getBoundingClientRect();
            const charCenterX = rect.left + rect.width / 2;
            const charCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to character
            const dist = Math.hypot((clientX - charCenterX) * 0.35, clientY - charCenterY);
            
            // Calculate target font weight based on distance (closer = bolder)
            const targetWeight = gsap.utils.clamp(100, 800, gsap.utils.mapRange(0, 120, 800, 100, dist));
            
            gsap.to(char, { 
                fontWeight: targetWeight, 
                duration: 0.5, 
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
            
            const dist = Math.hypot((clientX - charCenterX) * 0.35, clientY - charCenterY);
            const targetWeight = gsap.utils.clamp(100, 600, gsap.utils.mapRange(0, 60, 600, 100, dist));
                
            gsap.to(char, { 
                fontWeight: targetWeight, 
                duration: 0.5, 
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
   }

   function handleHeroMouseLeave() {
        // Reset all characters to thin font weight
        titleChars.forEach(char => {
            if(char) gsap.to(char, { fontWeight: 100, duration: 0.8, ease: 'power2.out' });
        });
        subtitleChars.forEach(char => {
            if(char) gsap.to(char, { fontWeight: 100, duration: 0.8, ease: 'power2.out' });
        });
   }

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
                    onmousemove={handleHeroMouseMove}
                    onmouseleave={handleHeroMouseLeave}
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
       
        <!-- Dock (Moved to back layer) -->
        <Dock items={dockItems} />

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
    </div>
</div>
