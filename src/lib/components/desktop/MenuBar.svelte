<script lang="ts">
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/themeStore';
    
    let time = $state(new Date());
    let showThemeMenu = $state(false);

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => clearInterval(interval);
    });

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit' 
        });
    };
    
    function toggleThemeMenu() {
        showThemeMenu = !showThemeMenu;
    }
    
    function setTheme(mode: 'light' | 'dark' | 'system') {
        if (mode === 'system') {
            localStorage.removeItem('theme');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme.set('dark');
            } else {
                theme.set('light');
            }
        } else {
            theme.set(mode);
        }
        showThemeMenu = false;
    }
</script>

<div class="h-10 w-full bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-between px-6 text-black dark:text-white transition-colors z-50 fixed top-0 select-none shadow-sm">
    <div class="flex items-center gap-6">
        <div class="flex items-center gap-1 font-bold text-lg">
            <img src="/images/logo.svg" alt="Apple" class="w-5 h-5 dark:invert" />
        </div>
        <span class="font-bold hidden sm:block text-[15px] tracking-wide">Muhammad As Shaff's Portfolio</span>
        <div class="hidden md:flex gap-6 text-[15px] font-medium">
            <button class="hover:text-blue-500 transition-colors">Projects</button>
            <button class="hover:text-blue-500 transition-colors">Testimonials</button>
            <button class="hover:text-blue-500 transition-colors">Contact</button>
            <button class="hover:text-blue-500 transition-colors">Resume</button>
        </div>
    </div>
    
    <div class="flex items-center gap-5 text-sm font-medium">
        <div class="hidden sm:flex items-center gap-4">
             <svg class="w-4 h-4 dark:text-white dark:invert-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
             </svg>
             <svg class="w-4 h-4 dark:text-white dark:invert-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
             
             <!-- Theme Toggle with Dropdown -->
             <div class="relative">
                 <button onclick={toggleThemeMenu} class="focus:outline-none flex items-center">
                    <img src="/icons/mode.svg" alt="Theme" class="w-4 h-4 dark:invert opacity-90 hover:opacity-100 transition-opacity" />
                 </button>
                 
                 {#if showThemeMenu}
                     <div class="absolute right-0 top-8 w-32 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 flex flex-col z-50 text-xs">
                         <button onclick={() => setTheme('light')} class="px-3 py-1.5 text-left hover:bg-blue-500 hover:text-white flex items-center gap-2">
                             <span>☀</span> Light
                         </button>
                         <button onclick={() => setTheme('dark')} class="px-3 py-1.5 text-left hover:bg-blue-500 hover:text-white flex items-center gap-2">
                             <span>☾</span> Dark
                         </button>
                         <button onclick={() => setTheme('system')} class="px-3 py-1.5 text-left hover:bg-blue-500 hover:text-white flex items-center gap-2 border-t border-gray-200/50 dark:border-gray-700/50 mt-1 pt-1">
                             <span>💻</span> System
                         </button>
                     </div>
                     <!-- Backdrop to close -->
                     <button class="fixed inset-0 z-40 cursor-default" onclick={() => showThemeMenu = false} aria-label="Close menu"></button>
                 {/if}
             </div>
        </div>
        <span class="text-[14px] tracking-wide">{formatTime(time)}</span>
    </div>
</div>
