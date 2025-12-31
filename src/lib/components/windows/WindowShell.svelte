
<script lang="ts">
    import { windowStore } from '$lib/stores/windowStore';
    import { theme } from '$lib/stores/themeStore';
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    let { id, title, children } = $props();

    let isDragging = $state(false);
    let dragOffset = $state({ x: 0, y: 0 });
    let windowRef = $state<HTMLDivElement>();
    
    let currentWindow = $derived($windowStore.find((w) => w.id === id));

    onMount(() => {
        // OS pop animation
        if (windowRef) {
            gsap.fromTo(windowRef, 
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' }
            );
        }
    });

    function startDrag(e: PointerEvent) {
         // Prevent drag if clicking interactive elements
         if ((e.target as HTMLElement).closest('.window-controls, button, a, input, textarea, [role="button"], select, [contenteditable]')) {
             return;
         }
         
         isDragging = true;
         if (currentWindow) {
             dragOffset = {
                 x: e.clientX - currentWindow.position.x,
                 y: e.clientY - currentWindow.position.y
             };
             windowStore.focusWindow(id);
             window.addEventListener('pointermove', onDrag);
             window.addEventListener('pointerup', stopDrag);
             (e.target as HTMLElement).setPointerCapture(e.pointerId);
         }
    }

    function onDrag(e: PointerEvent) {
        if (!isDragging) return;
        windowStore.updatePosition(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
    }

    function stopDrag(e: PointerEvent) {
        isDragging = false;
        window.removeEventListener('pointermove', onDrag);
        window.removeEventListener('pointerup', stopDrag);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
    
    function handleFocus() {
        windowStore.focusWindow(id);
    }
    
    function closeWin() {
        if (!windowRef) {
            windowStore.closeWindow(id);
            return;
        }
        // Animate out then close
        gsap.to(windowRef, { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.2, 
            onComplete: () => windowStore.closeWindow(id) 
        });
    }

    function minimizeWin() {
        if (!windowRef) {
             windowStore.minimizeWindow(id);
             return;
        }
        gsap.to(windowRef, {
             y: window.innerHeight,
             scale: 0.1,
             opacity: 0,
             duration: 0.4,
             ease: 'power3.in',
             onComplete: () => windowStore.minimizeWindow(id)
        });
    }
</script>

{#if currentWindow && !currentWindow.minimized}
<div
    bind:this={windowRef}
    class="fixed rounded-lg shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800 pointer-events-auto"
    style="
        left: {currentWindow.position.x}px;
        top: {currentWindow.position.y}px;
        z-index: {currentWindow.zIndex};
        width: 800px;
        max-width: 90vw;
        max-height: 80vh;
        cursor: {isDragging ? 'grabbing' : 'grab'};
    "
    onmousedown={handleFocus}
    onpointerdown={startDrag}
    role="dialog"
    aria-label={title}
    tabindex="-1"
>
    <!-- Title Bar -->
    <div
        class="h-10 {$theme === 'dark' ? 'bg-[#2a2a2a] text-gray-300' : 'bg-[#e5e5e5] text-gray-700'} flex items-center px-4 select-none rounded-t-lg border-b {$theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}"
    >
        <div class="window-controls flex gap-2 mr-4 group">
            <button
                aria-label="Close window"
                class="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center text-[8px] text-black/50 font-bold cursor-default"
                onclick={(e) => { e.stopPropagation(); closeWin(); }}
                onpointerdown={(e) => e.stopPropagation()}
            >
                <span class="opacity-0 group-hover:opacity-100">x</span>
            </button>
            <button
                aria-label="Minimize window"
                class="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 flex items-center justify-center text-[8px] text-black/50 font-bold cursor-default"
                onclick={(e) => { e.stopPropagation(); minimizeWin(); }}
                 onpointerdown={(e) => e.stopPropagation()}
            >
                 <span class="opacity-0 group-hover:opacity-100">-</span>
            </button>
            <button
                aria-label="Maximize window"
                class="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 flex items-center justify-center text-[8px] text-black/50 font-bold cursor-default"
                onpointerdown={(e) => e.stopPropagation()}
            >
                 <span class="opacity-0 group-hover:opacity-100">+</span>
            </button>
        </div>
        <div class="flex-1 text-center text-sm font-semibold truncate">
            {title}
        </div>
        <div class="w-16"></div> 
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-hidden bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 relative rounded-b-lg flex flex-col">
         {@render children()}
    </div>
</div>
{/if}
