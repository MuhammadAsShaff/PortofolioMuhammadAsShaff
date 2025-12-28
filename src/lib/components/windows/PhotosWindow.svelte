
<script lang="ts">
    import WindowShell from './WindowShell.svelte';
    import { photos } from '$lib/data/photos';
    let { id, title } = $props();
</script>

<WindowShell {id} {title}>
    <div class="h-full flex flex-col bg-white dark:bg-[#1e1e1e]">
         <div class="h-10 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 font-semibold text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
            Library
         </div>
         <div class="flex-1 overflow-auto p-2">
             <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                 {#each photos as photo}
                 <div class="aspect-square bg-gray-200 relative overflow-hidden group rounded-sm cursor-pointer">
                     <img src={photo.src} alt={photo.alt} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                     <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                 </div>
                 {/each}
             </div>
         </div>
    </div>
</WindowShell>
