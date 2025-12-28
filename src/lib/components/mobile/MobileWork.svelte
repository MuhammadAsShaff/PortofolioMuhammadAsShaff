
<script lang="ts">
   import { mobileNav } from '$lib/stores/mobileNavStore';
   import { fileSystemList, type FileSystemItem } from '$lib/data/fileSystem';
   
   let { data } = $mobileNav;
   
   let currentFolderId = $state(data?.path || 'root-work');
   
   function findItem(items: FileSystemItem[], targetId: string): FileSystemItem | null {
        for (const item of items) {
           if (item.id === targetId) return item;
           if (item.children) {
               const found = findItem(item.children, targetId);
               if (found) return found;
           }
        }
        return null;
   }
   
   let currentFolder = $derived(findItem(fileSystemList, currentFolderId) || fileSystemList[0]);
   
   function back() {
       if (currentFolderId === 'root-work' || currentFolderId === 'root-resume') {
           mobileNav.goBack();
       } else {
           // Basic logic to go up one level?
           // Since filesystem is tree, need parent pointer or search.
           // For simple portfolio structure, just go to root-work.
           currentFolderId = 'root-work';
       }
   }
   
   function open(item: FileSystemItem) {
       if (item.type === 'folder') {
           currentFolderId = item.id;
       } else if (item.type === 'file' || item.type === 'link') {
          // In mobile, maybe open simplified view or link
          if (item.type === 'link' && item.content) {
              window.open(item.content, '_blank');
          } else {
              alert('Opening file: ' + item.name);
          }
       }
   }
</script>

<div class="h-screen flex flex-col bg-gray-50 dark:bg-black text-black dark:text-white font-sans">
     <!-- Nav Bar -->
     <div class="h-12 flex items-end justify-between px-4 pb-2 bg-white dark:bg-[#1c1c1e] border-b border-gray-200 dark:border-gray-800 transition-colors">
         <button class="text-[#007AFF] font-medium flex items-center text-lg active:opacity-50" onclick={back}>
             <span class="mr-1 text-2xl leading-none">‹</span> Back
         </button>
         <span class="font-semibold text-lg">{currentFolder.name}</span>
         <button class="text-[#007AFF] font-medium opacity-0">Edit</button>
     </div>
     
     <!-- Search -->
     <div class="px-4 py-3 bg-white dark:bg-[#1c1c1e]">
         <div class="bg-gray-100 dark:bg-[#2c2c2e] h-10 rounded-xl flex items-center px-3 gap-2 text-gray-500">
             <span>🔍</span>
             <span class="text-[17px]">Search</span>
         </div>
     </div>
     
     <!-- Content -->
     <div class="flex-1 overflow-auto p-4">
         <div class="grid grid-cols-3 gap-x-4 gap-y-8">
             {#if currentFolder && currentFolder.children}
                 {#each currentFolder.children as child}
                      <button class="flex flex-col items-center gap-2 group" onclick={() => open(child)}>
                          <div class="text-[64px] text-[#007AFF] drop-shadow-sm transition-transform group-active:scale-90">
                              {child.type === 'folder' ? '📂' : '📄'}
                          </div>
                          <span class="text-[13px] font-medium text-center leading-tight line-clamp-2 w-full break-words text-black dark:text-white">
                            {child.name}
                          </span>
                      </button>
                 {/each}
             {/if}
         </div>
     </div>
     
     <!-- Bottom Tab Bar for App (Generic iOS style) -->
     <div class="h-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1c1c1e] flex justify-around items-start pt-3 pb-8 safe-area-bottom">
         <button class="flex flex-col items-center gap-1 text-[#007AFF]">
             <span class="text-2xl">📂</span>
             <span class="text-[10px] font-medium">Browse</span>
         </button>
         <button class="flex flex-col items-center gap-1 text-gray-400">
             <span class="text-2xl">🕒</span>
             <span class="text-[10px] font-medium">Recents</span>
         </button>
     </div>
</div>

<style>
    .safe-area-bottom {
        padding-bottom: env(safe-area-inset-bottom);
    }
</style>
