
<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { windowStore } from '$lib/stores/windowStore';

    let { items } = $props(); 

    let dock: HTMLDivElement;
    let icons: HTMLElement[] = []; // Track icon elements

    onMount(() => {
        // We will simply use styling classes + GSAP for interactive hover
        // Complex GSAP dock needs precise mouse tracking relative to elements
    });

    function handleMouseMove(e: MouseEvent) {
        // Basic Magnification Algo using GSAP
        // Iterate over icons, calculate distance, scale accordingly
        if (!dock) return;
        
        const dockRect = dock.getBoundingClientRect();
        // If mouse is outside broad range, reset
        
        icons.forEach((icon, i) => {
             if(!icon) return;
             const rect = icon.getBoundingClientRect();
             const iconCenterX = rect.left + rect.width / 2;
             const dist = Math.abs(e.clientX - iconCenterX);
             
             // Range of effect = 120px
             if (dist < 120) {
                 const scale = 1 + (1 - dist / 120) * 0.4; // Max scale 1.4
                 gsap.to(icon, { scale: scale, duration: 0.1, overwrite: 'auto' });
             } else {
                 gsap.to(icon, { scale: 1, duration: 0.1, overwrite: 'auto' });
             }
        });
    }

    function resetScale() {
        if(!icons) return;
         icons.forEach(icon => {
              if(icon) gsap.to(icon, { scale: 1, duration: 0.3, ease: 'power2.out' });
         });
    }

</script>

<!-- Outer container to capture mouse area slightly larger -->
<div 
    class="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-end justify-center z-50 h-32 px-4"
    onmousemove={handleMouseMove}
    onmouseleave={resetScale}
    role="toolbar"
    tabindex="0"
>
    <!-- Dock BG -->
    <div 
        bind:this={dock}
        class="flex items-end gap-3 px-6 pb-4 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl h-[88px] md:h-28 origin-bottom"
    >
        {#each items as item, i}
            <button
                bind:this={icons[i]}
                class="group relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 origin-bottom rounded-xl focus:outline-none"
                onclick={item.action}
                aria-label={item.name}
            >
                <div class="w-full h-full text-5xl flex items-center justify-center transition-all">
                   {#if item.icon.startsWith('http') || item.icon.startsWith('/')}
                      <img src={item.icon} alt={item.name} class="w-full h-full object-contain drop-shadow-md" />
                   {:else}
                      <span class="text-4xl drop-shadow-md">{item.icon}</span>
                   {/if}
                </div>
                
                 <!-- Active Dot -->
                 {#if $windowStore.some(w => w.type === item.id && !w.minimized)}
                    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black/60 dark:bg-white/60 rounded-full"></div>
                {/if}
                
                <!-- Tooltip -->
                <span class="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gray-900/90 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur font-medium z-50 shadow-xl">
                    {item.name}
                    <!-- Triangle pointer -->
                    <span class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/90"></span>
                </span>
            </button>
        {/each}
    </div>
</div>
