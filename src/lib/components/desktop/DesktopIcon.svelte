<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let { id, name, icon, initialPos, onclick, folderType = undefined } = $props();

    // -- STATE --
    // Current position of the icon on screen
    let position = $state({ x: 20, y: 50 });
    
    // Dragging state
    let isDragging = $state(false);
    let dragOffset = $state({ x: 0, y: 0 });
    let moved = false; // Tracks if we actually moved the mouse (to distinguish click vs drag)

    // Initialize position only once based on props
    $effect.pre(() => {
        if (initialPos) {
            position = initialPos;
        }
    });
    
    // Determine what to display (image path or emoji)
    let displayIcon = $derived.by(() => {
        // Fallback or legacy check
        if (icon === 'files' || folderType) return '📁'; 
        return icon;
    });

    onMount(() => {
        // Component mounted
    });

    // -- DRAG HANDLERS --

    /**
     * Starts the drag operation.
     */
    function startDrag(e: MouseEvent) {
        // Only allow left click (button 0)
        if (e.button !== 0) return;
        
        isDragging = true;
        moved = false;
        
        // Calculate offset so the icon doesn't snap to the mouse cursor top-left
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        // We need coordinates relative to the parent container usually, but basic offset works for delta
        dragOffset = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        
        // Add global listeners to handle dragging outside the icon
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    }

    /**
     * Updates position while dragging.
     */
    function onDrag(e: MouseEvent) {
        if (!isDragging) return;
        
        // Add a small threshold (3px) to prevent micro-movements from counting as a drag
        // This ensures clean "clicks" are still registered easily
        if (!moved) {
            const dx = Math.abs(e.clientX - dragOffset.x - position.x);
            const dy = Math.abs(e.clientY - dragOffset.y - position.y);
            if (dx < 3 && dy < 3) return;
        }

        moved = true;
        
        // Update position
        position.x = e.clientX - dragOffset.x;
        position.y = e.clientY - dragOffset.y;
    }

    /**
     * Ends the drag operation.
     */
    function stopDrag() {
        if (isDragging) {
             isDragging = false;
             window.removeEventListener('mousemove', onDrag);
             window.removeEventListener('mouseup', stopDrag);
             
             if (browser) {
                 // Constrain icon to window bounds so it doesn't get lost
                 position.x = Math.max(0, Math.min(window.innerWidth - 100, position.x));
                 position.y = Math.max(40, Math.min(window.innerHeight - 120, position.y));
                 // No saving to local storage
             }
        }
    }
    
    /**
     * Handles the final click event.
     * Only triggers if we haven't dragged the icon.
     */
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
    <span class="text-white text-[11px] md:text-xs font-medium px-2 py-0.5 rounded-md bg-black/0 group-hover:bg-blue-600/80 group-focus:bg-blue-600/80 text-shadow shadow-black text-center break-words w-full leading-tight line-clamp-2">
        {name}
    </span>
</div>

<style>
    .text-shadow {
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
</style>
