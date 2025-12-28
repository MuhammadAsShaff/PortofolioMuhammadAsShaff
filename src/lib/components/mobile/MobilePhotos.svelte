
<script lang="ts">
  import { mobileNav } from '$lib/stores/mobileNavStore';
  import { photos } from '$lib/data/photos';
</script>
<div class="h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
    <div class="h-12 flex items-center px-4 justify-between">
         <button onclick={() => mobileNav.goBack()} class="text-blue-500 flex items-center">
            <span class="text-2xl mr-1">‹</span> Albums
         </button>
         <span class="font-bold">Recents</span>
         <button class="text-blue-500">Select</button>
    </div>
    <div class="flex-1 overflow-auto p-1">
         <div class="grid grid-cols-3 gap-0.5">
             {#each photos as photo}
                 <img src={photo.src} alt={photo.alt} class="aspect-square object-cover w-full" />
             {/each}
         </div>
    </div>
    <div class="h-12 border-t dark:border-gray-800 flex items-center justify-around">
        <span class="text-blue-500 font-bold">Library</span>
        <span class="text-gray-500">For You</span>
        <span class="text-gray-500">Albums</span>
        <span class="text-gray-500">Search</span>
    </div>
</div>
