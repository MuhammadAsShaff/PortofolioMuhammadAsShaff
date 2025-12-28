<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let { id, name, icon, initialPos, onclick, folderType = undefined } = $props();

    let position = $state({ x: 20, y: 50 });
    let isDragging = $state(false);
    let dragOffset = $state({ x: 0, y: 0 });
    let moved = false;

    // Initialize only once
    $effect.pre(() => {
        if (initialPos) {
            position = initialPos;
        }
    });
    
    // Icon resolution
    let displayIcon = $derived.by(() => {
        if (icon === 'files' || folderType) return '📁'; 
        return icon;
    });

    onMount(() => {
        if (browser) {
            // Check local storage for saved position
            const saved = localStorage.getItem(`icon-pos-${id}`);
            if (saved) {
                try {
                    position = JSON.parse(saved);
                } catch(e) {}
            }
        }
    });

    function startDrag(e: MouseEvent) {
        // Only left click
        if (e.button !== 0) return;
        
        isDragging = true;
        moved = false;
        
        // Calculate offset from the top-left of the icon
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        // We need coordinates relative to the parent container usually, but basic offset works for delta
        dragOffset = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    }

    function onDrag(e: MouseEvent) {
        if (!isDragging) return;
        
        // Add threshold to prevent micro-movements from validating as a drag
        if (!moved) {
            const dx = Math.abs(e.clientX - dragOffset.x - position.x);
            const dy = Math.abs(e.clientY - dragOffset.y - position.y);
            if (dx < 3 && dy < 3) return;
        }

        moved = true;
        
        position.x = e.clientX - dragOffset.x;
        position.y = e.clientY - dragOffset.y;
    }

    function stopDrag() {
        if (isDragging) {
             isDragging = false;
             window.removeEventListener('mousemove', onDrag);
             window.removeEventListener('mouseup', stopDrag);
             
             if (browser) {
                 // Bounds checking
                 position.x = Math.max(0, Math.min(window.innerWidth - 100, position.x));
                 position.y = Math.max(40, Math.min(window.innerHeight - 120, position.y));
                 localStorage.setItem(`icon-pos-${id}`, JSON.stringify(position));
             }
        }
    }
    
    function handleClick() {
        if (!moved) {
            onclick && onclick();
        }
    }
</script>

<div
    class="absolute flex flex-col items-center gap-1.5 w-24 md:w-28 cursor-pointer p-2 rounded hover:bg-white/10 transition-colors select-none group focus:bg-white/20 outline-none"
    style="
        left: {position.x}px; 
        top: {position.y}px;
        z-index: {isDragging ? 50 : 0};
    "
    onmousedown={startDrag}
    onmouseup={handleClick}
    role="button"
    tabindex="0"
>
    <!-- Icon Container -->
    <div class="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-transform group-active:scale-95 pointer-events-none">
        {#if displayIcon && (displayIcon.startsWith('/') || displayIcon.startsWith('http'))}
            <img src={displayIcon} alt="" class="w-full h-full object-contain drop-shadow-2xl" draggable="false"/>
        {:else if folderType}
             <div class="text-6xl drop-shadow-2xl filter {folderType === 'blue' ? 'contrast-100 hue-rotate-0' : 'hue-rotate-180'}">
                📁
             </div>
        {:else}
            <div class="text-6xl drop-shadow-2xl">
                {displayIcon}
            </div>
        {/if}
    </div>
    <span class="text-white text-xs md:text-sm font-medium px-2 py-0.5 rounded-md bg-black/0 group-hover:bg-blue-600/80 group-focus:bg-blue-600/80 text-shadow shadow-black text-center break-words w-full leading-tight line-clamp-2">
        {name}
    </span>
</div>

<style>
    .text-shadow {
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
</style>
