<script lang="ts">
    import { mobileNav } from '$lib/stores/mobileNavStore';
    import { fileSystemList, type FileSystemItem } from '$lib/data/fileSystem';
    import { windowStore } from '$lib/stores/windowStore';
    
    let { data } = $mobileNav;
    
    // Default to 'root' to show all top-level items
    let currentFolderId = $state(data?.path || 'root');
    let navHistory = $state<string[]>(['root']);
    
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
    
    // Virtual Root handling
    let currentFolder = $derived.by(() => {
        if (currentFolderId === 'root') {
            return {
                id: 'root',
                name: 'Portfolio',
                type: 'folder',
                children: fileSystemList
            } as FileSystemItem;
        }
        return findItem(fileSystemList, currentFolderId) || fileSystemList[0];
    });
    
    function back() {
        if (navHistory.length > 1) {
            navHistory.pop(); // Remove current
            currentFolderId = navHistory[navHistory.length - 1]; // Go to previous
        } else {
            mobileNav.goBack();
        }
    }
    
    function open(item: FileSystemItem) {
        if (item.type === 'folder') {
            navHistory.push(item.id);
            currentFolderId = item.id;
        } else if (item.type === 'file' || item.type === 'link') {
            if (item.type === 'link' && item.content) {
               window.open(item.content, '_blank');
            } else if (item.id === 'resume-work') {
                mobileNav.goTo('document', {});
            } else if (item.name.endsWith('.pdf')) {
                window.open(item.content, '_blank');
            } else if (item.metadata?.docData) {
                 // Explicitly handle Document Data
                 mobileNav.goTo('document', { docData: item.metadata.docData });
            } else {
                 // Fallback: If it has content but no doc structure, still try to show it in document viewer or just do nothing
                 // avoiding alert() to prevent user confusion
                 console.log('Unknown item type or missing data', item);
            }
        }
    }

     /**
      * GET ITEM ICON
      * Returns the appropriate icon path based on the item type and name.
      */
     function getItemIcon(item: FileSystemItem): string {
         if (item.icon) return item.icon;
         if (item.type === 'folder') return '/images/folder.png';
         if (item.name.endsWith('.pdf')) return '/images/pdf.png';
         if (item.metadata?.fileType === 'doc') return '/images/txt.png';
         if (item.type === 'link') return '/images/safari.png';
         if (item.metadata?.fileType === 'image') return '/images/photos.png';
         return '/images/txt.png';
     }
</script>

<div class="h-screen flex flex-col bg-gray-50 dark:bg-black text-black dark:text-white font-sans">
     <!-- Nav Bar -->
     <div class="h-12 flex items-end justify-between px-4 pb-2 bg-white dark:bg-[#1c1c1e] border-b border-gray-200 dark:border-gray-800 transition-colors shrink-0 z-10">
         <button class="text-[#007AFF] font-medium flex items-center text-lg active:opacity-50" onclick={back}>
             <span class="mr-1 text-2xl leading-none">‹</span> Back
         </button>
         <span class="font-semibold text-lg truncate max-w-[60%]">{currentFolder.name}</span>
         <button class="text-[#007AFF] font-medium opacity-0">Edit</button>
     </div>
     
     <!-- Search -->
     <div class="px-4 py-3 bg-white dark:bg-[#1c1c1e] shrink-0">
         <div class="bg-gray-100 dark:bg-[#2c2c2e] h-10 rounded-xl flex items-center px-3 gap-2 text-gray-500">
             <span>🔍</span>
             <span class="text-[17px]">Search</span>
         </div>
     </div>
     
     <!-- Content -->
     <div class="flex-1 overflow-y-auto p-4 content-start">
         <div class="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-8 pb-20">
             {#if currentFolder && currentFolder.children}
                 {#each currentFolder.children as child}
                      <button 
                        class="flex flex-col items-center gap-2 group w-full" 
                        onclick={() => open(child)}
                      >
                          <!-- Clean icon without container padding -->
                          <div class="w-16 h-16 sm:w-20 sm:h-20 transition-transform group-active:scale-95 rounded-xl overflow-hidden flex items-center justify-center">
                               <img 
                                   src={getItemIcon(child)} 
                                   alt={child.name}
                                   class="w-full h-full object-contain drop-shadow-sm {child.icon && child.icon.includes('/icons/') ? 'dark:invert' : ''}"
                               />
                          </div>
                          <span class="text-[12px] sm:text-[13px] font-medium text-center leading-tight line-clamp-2 w-full break-words text-gray-900 dark:text-gray-100">
                            {child.name}
                          </span>
                      </button>
                 {/each}
                 {#if currentFolder.children.length === 0}
                    <div class="col-span-3 text-center text-gray-400 py-10">Empty Folder</div>
                 {/if}
             {/if}
         </div>
     </div>
     
     <!-- Bottom Tab Bar for App (Generic iOS style) -->
     <div class="h-[83px] border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1c1c1e] flex justify-around items-start pt-2 safe-area-bottom shrink-0 z-10">
         <button class="flex flex-col items-center gap-1 text-[#007AFF]">
             <img src="/images/folder.png" class="w-6 h-6 object-contain" alt="Browse" />
             <span class="text-[10px] font-medium">Browse</span>
         </button>
         <button class="flex flex-col items-center gap-1 text-gray-400">
             <img src="/images/finder.png" class="w-6 h-6 object-contain grayscale opacity-50" alt="Recents" />
             <span class="text-[10px] font-medium">Recents</span>
         </button>
     </div>
</div>

<style>
    .safe-area-bottom {
        padding-bottom: env(safe-area-inset-bottom);
    }
</style>
