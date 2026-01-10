
<script lang="ts">
    import { windowStore } from '$lib/stores/windowStore';
    import { theme } from '$lib/stores/themeStore';
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    let { id, title, children } = $props();

    let isDragging = $state(false);
    let isResizing = $state(false);
    let resizeDirection = $state('');
    let dragOffset = $state({ x: 0, y: 0 });
    let resizeStart = $state({ width: 0, height: 0, x: 0, y: 0, mouseX: 0, mouseY: 0 });
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
         // Prevent drag if clicking interactive elements or resize handles
         if ((e.target as HTMLElement).closest('.window-controls, button, a, input, textarea, [role="button"], select, [contenteditable], .resize-handle')) {
             return;
         }
         
         isDragging = true;
         if (currentWindow) {
             dragOffset = {
                 x: e.clientX - currentWindow.position.x,
                 y: e.clientY - currentWindow.position.y
             };
             windowStore.focusWindow(id);
             window.addEventListener('pointermove', onPointerMove);
             window.addEventListener('pointerup', stopInteraction);
             (e.target as HTMLElement).setPointerCapture(e.pointerId);
         }
    }

    function startResize(e: PointerEvent, direction: string) {
        e.stopPropagation();
        isResizing = true;
        resizeDirection = direction;
        
        if (currentWindow) {
            resizeStart = {
                width: currentWindow.size?.width || 800,
                height: currentWindow.size?.height || 600,
                x: currentWindow.position.x,
                y: currentWindow.position.y,
                mouseX: e.clientX,
                mouseY: e.clientY
            };
            windowStore.focusWindow(id);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', stopInteraction);
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }
    }

    function onPointerMove(e: PointerEvent) {
        if (isDragging) {
            windowStore.updatePosition(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
        } else if (isResizing) {
            let newWidth = resizeStart.width;
            let newHeight = resizeStart.height;
            let newX = resizeStart.x;
            let newY = resizeStart.y;
            
            const dx = e.clientX - resizeStart.mouseX;
            const dy = e.clientY - resizeStart.mouseY;

            if (resizeDirection.includes('e')) newWidth = Math.max(300, resizeStart.width + dx);
            if (resizeDirection.includes('s')) newHeight = Math.max(200, resizeStart.height + dy);
            if (resizeDirection.includes('w')) {
                const w = Math.max(300, resizeStart.width - dx);
                newWidth = w;
                newX = resizeStart.x + (resizeStart.width - w);
            }
            if (resizeDirection.includes('n')) {
                const h = Math.max(200, resizeStart.height - dy);
                newHeight = h;
                newY = resizeStart.y + (resizeStart.height - h);
            }

            // Update both size and position if necessary (for left/top resizing)
            if (resizeDirection.includes('w') || resizeDirection.includes('n')) {
                windowStore.updatePosition(id, newX, newY);
            }
            windowStore.updateSize(id, newWidth, newHeight);
        }
    }

    function stopInteraction(e: PointerEvent) {
        isDragging = false;
        isResizing = false;
        resizeDirection = '';
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', stopInteraction);
        // Release capture if target still exists
        try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch (err) { /* ignore */ }
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
        width: {currentWindow.size?.width || 800}px;
        height: {currentWindow.size?.height || 600}px;
        max-width: 100vw;
        max-height: 100vh;
        cursor: {isDragging ? 'grabbing' : 'default'};
    "
    onmousedown={handleFocus}
    onpointerdown={startDrag}
    role="dialog"
    aria-label={title}
    tabindex="-1"
>
    <!-- Resize Handles -->
    <!-- Sides -->
    <div class="resize-handle absolute -top-2 left-0 right-0 h-4 cursor-n-resize z-50 bg-transparent" onpointerdown={(e) => startResize(e, 'n')}></div>
    <div class="resize-handle absolute -bottom-2 left-0 right-0 h-4 cursor-s-resize z-50 bg-transparent" onpointerdown={(e) => startResize(e, 's')}></div>
    <div class="resize-handle absolute top-0 -left-2 bottom-0 w-4 cursor-w-resize z-50 bg-transparent" onpointerdown={(e) => startResize(e, 'w')}></div>
    <div class="resize-handle absolute top-0 -right-2 bottom-0 w-4 cursor-e-resize z-50 bg-transparent" onpointerdown={(e) => startResize(e, 'e')}></div>
    
    <!-- Corners (Larger hit area) -->
    <div class="resize-handle absolute -top-3 -left-3 w-6 h-6 cursor-nw-resize z-[51] bg-transparent" onpointerdown={(e) => startResize(e, 'nw')}></div>
    <div class="resize-handle absolute -top-3 -right-3 w-6 h-6 cursor-ne-resize z-[51] bg-transparent" onpointerdown={(e) => startResize(e, 'ne')}></div>
    <div class="resize-handle absolute -bottom-3 -left-3 w-6 h-6 cursor-sw-resize z-[51] bg-transparent" onpointerdown={(e) => startResize(e, 'sw')}></div>
    <div class="resize-handle absolute -bottom-3 -right-3 w-6 h-6 cursor-se-resize z-[51] bg-transparent" onpointerdown={(e) => startResize(e, 'se')}></div>

    <!-- Title Bar -->
    <div
        class="h-10 {$theme === 'dark' ? 'bg-[#2a2a2a] text-gray-300' : 'bg-[#e5e5e5] text-gray-700'} flex items-center px-4 select-none rounded-t-lg border-b {$theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}"
    >
        <div class="window-controls flex gap-2 mr-4 group z-20">
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
    <div class="flex-1 overflow-hidden bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 relative rounded-b-lg flex flex-col pointer-events-auto">
         {@render children()}
    </div>
</div>
{/if}
