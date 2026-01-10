
<script lang="ts">
    import WindowShell from './WindowShell.svelte';
    import { fileSystemList, type FileSystemItem } from '$lib/data/fileSystem';
    import { windowStore } from '$lib/stores/windowStore';

    let { id, title, data } = $props(); 

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
    
    // -- STATE VARIABLES --
    
    // The ID of the folder currently being viewed
    let currentFolderId = $state('root-work');
    
    // Navigation stack to track where we've been (like a browser back button)
    // Renamed to navHistory to avoid conflict with browser's window.history
    let navHistory = $state<string[]>([]);
    
    // Current position in the navigation stack
    let navHistoryIndex = $state(0);
    
    // Track selection in the file grid
    let selectedItemId = $state<string | null>(null);
    
    // View mode state: 'grid' (large icons) or 'list' (details list)
    let viewMode = $state<'grid' | 'list'>('grid');

    // -- EFFECTS (Reactive Logic) --
    
    $effect(() => {
        // When the window opens, if a folderId is provided, start there.
        // Otherwise, default to 'root-work'.
        if (data?.folderId && navHistory.length === 0) {
            currentFolderId = data.folderId;
            navHistory = [data.folderId];
        } else if (navHistory.length === 0) {
            navHistory = ['root-work'];
        }
    });
    
    // Automatically find the folder object whenever currentFolderId changes
    let currentFolder = $derived(
        findItem(fileSystemList, currentFolderId) || fileSystemList[0]
    );

    // -- NAVIGATION FUNCTIONS --

    /**
     * Opens an item (Folder, File, or Link).
     */
    function navigate(item: FileSystemItem) {
        if (item.type === 'folder') {
             // Go deeper into folder: add to history and advance index
             navHistory = [...navHistory.slice(0, navHistoryIndex + 1), item.id];
             navHistoryIndex++;
             currentFolderId = item.id;
             selectedItemId = null;
        } else if (item.type === 'file') {
             // Open specific file types
             if (item.name.endsWith('.pdf')) {
                 windowStore.openWindow({ 
                     id: 'resume-' + Date.now(), 
                     title: item.name, 
                     type: 'resume',
                     data: { src: item.content } 
                 });
             } else if (item.metadata?.fileType === 'doc') {
                 windowStore.openWindow({ 
                     id: 'resume-' + Date.now(), 
                     title: item.name, 
                     type: 'resume',
                     data: { docData: item.metadata.docData } 
                 });
             } else if (item.metadata?.fileType === 'text') {
                 windowStore.openWindow({ 
                     id: 'text-' + Date.now(), 
                     title: item.name, 
                     type: 'text',
                     data: { content: item.content, image: item.metadata?.image } 
                 });
             } else if (item.metadata?.fileType === 'image') {
                  windowStore.openWindow({
                      id: 'photos-' + Date.now(),
                      title: 'Photos',
                      type: 'photos',
                      data: { filter: item.id } 
                  });
             }
        } else if (item.type === 'link') {
             windowStore.openWindow({
                 id: 'safari-' + Date.now(),
                 title: item.name,
                 type: 'safari',
                 data: { url: item.content }
             });
        }
    }

    /**
     * Navigates back in the history stack.
     */
    function goBack() {
        if (navHistoryIndex > 0) {
            navHistoryIndex--;
            currentFolderId = navHistory[navHistoryIndex];
            selectedItemId = null; // Clear selection
        }
    }
    
    /**
     * Navigates forward in the history stack.
     */
    function goForward() {
        if (navHistoryIndex < navHistory.length - 1) {
            navHistoryIndex++;
            currentFolderId = navHistory[navHistoryIndex];
            selectedItemId = null; // Clear selection
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
         if (item.metadata?.fileType === 'doc') return '/images/txt.png'; // Fallback or generic doc icon if needed
         if (item.type === 'link') return '/images/safari.png';
         if (item.metadata?.fileType === 'image') return '/images/photos.png';
         return '/images/txt.png';
     }
 </script>

 <WindowShell {id} {title}>
     <div class="flex h-full text-gray-800 dark:text-gray-200 font-sans">
          <!-- Sidebar: Quick Access / Favorites -->
          <div class="w-52 bg-gray-100/90 dark:bg-[#1f1f1f]/95 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 p-3 text-sm flex-shrink-0 flex flex-col pt-5 hidden md:flex">
              <div class="text-[11px] text-gray-500 dark:text-gray-400 font-bold mb-2 px-3 uppercase tracking-wide opacity-80">Favorites</div>
              <div class="space-y-0.5">
              {#each fileSystemList as fav}
                  <button 
                      class="w-full text-left px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-3 transition-colors {currentFolderId === fav.id ? 'bg-black/10 dark:bg-white/10 sm:font-medium' : 'font-normal'}"
                      onclick={() => {
                         currentFolderId = fav.id;
                         navHistory = [...navHistory, fav.id];
                         navHistoryIndex++;
                         selectedItemId = null; // Reset selection
                      }}
                  >
                      <span class="w-4 h-4 flex items-center justify-center opacity-90">
                         <!-- Use the helper function for icons, adding specific overrides for sidebar look if needed -->
                         <img src={getItemIcon(fav)} class="w-full h-full object-contain {fav.id === 'about-us' ? 'dark:invert' : ''}" alt={fav.name} />
                      </span>
                      <span class="truncate">{fav.name}</span>
                  </button>
              {/each}
              </div>
              
              <!-- Static iCloud Section -->
              <div class="mt-6 text-[11px] text-gray-500 dark:text-gray-400 font-bold mb-2 px-3 uppercase tracking-wide opacity-80">iCloud</div>
              <div class="space-y-0.5">
                  <button class="w-full text-left px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-3 transition-colors opacity-50 cursor-not-allowed">
                      <span class="w-4 h-4"><img src="/images/folder.png" class="w-full h-full object-contain grayscale" alt="docs" /></span>
                      <span>Documents</span>
                  </button>
                  <button class="w-full text-left px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-3 transition-colors opacity-50 cursor-not-allowed">
                      <span class="w-4 h-4"><img src="/images/folder.png" class="w-full h-full object-contain grayscale" alt="downloads" /></span>
                      <span>Downloads</span>
                  </button>
              </div>
          </div>
          
          <!-- Main Content Area -->
          <div class="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
              <!-- Toolbar -->
              <div class="h-12 border-b border-gray-200 dark:border-white/10 flex items-center px-4 gap-4 bg-gray-50/50 dark:bg-[#282828] transition-colors justify-between">
                  
                  <!-- Left Controls (Nav) -->
                  <div class="flex gap-2">
                      <button class="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors" onclick={goBack} disabled={navHistoryIndex === 0} aria-label="Go back">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dark:text-gray-300"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                       <button class="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors" onclick={goForward} disabled={navHistoryIndex === navHistory.length - 1} aria-label="Go forward">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dark:text-gray-300"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                  </div>

                  <!-- Folder Title -->
                  <div class="font-semibold text-sm flex-1 opacity-90 tracking-wide text-center dark:text-gray-200 truncate px-2">
                      {currentFolder.name}
                  </div>

                  <!-- Right Controls (Search & View Toggle) -->
                   <div class="flex items-center gap-3">
                       <!-- View Toggle -->
                       <div class="flex bg-gray-200/50 dark:bg-white/5 rounded-md p-0.5 border border-black/5 dark:border-white/5">
                            <button 
                                class="p-1 rounded transition-all {viewMode === 'grid' ? 'bg-white dark:bg-white/20 shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-50'}"
                                onclick={() => viewMode = 'grid'}
                                title="Grid View"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            </button>
                            <button 
                                class="p-1 rounded transition-all {viewMode === 'list' ? 'bg-white dark:bg-white/20 shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-50'}"
                                onclick={() => viewMode = 'list'}
                                title="List View"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                            </button>
                       </div>

                       <!-- Search -->
                       <img src="/icons/search.svg" class="w-4 h-4 dark:invert opacity-60 ml-2" alt="Search" />
                   </div>
              </div>
              
              <!-- Content View -->
              <!-- Added role="button" and tab index for accessibility on the background click -->
              <div 
                  class="flex-1 overflow-auto bg-white dark:bg-[#1e1e1e]" 
                  onclick={(e) => { if(e.target === e.currentTarget) selectedItemId = null; }}
                  role="button"
                  tabindex="0"
                  onkeydown={(e) => { if(e.key === 'Escape') selectedItemId = null; }}
              >
                <!-- GRID VIEW -->
                {#if viewMode === 'grid'}
                  <div class="p-6 grid grid-cols-4 md:grid-cols-5 gap-y-8 gap-x-4 content-start h-full">
                      {#if currentFolder && currentFolder.children}
                          {#each currentFolder.children as child}
                              <button 
                                  class="flex flex-col items-center gap-2 group outline-none w-24 mx-auto"
                                  onclick={(e) => { e.stopPropagation(); selectedItemId = child.id; }}
                                  ondblclick={(e) => { e.stopPropagation(); navigate(child); }}
                              >
                                  <div class="w-16 h-16 transition-transform group-active:scale-95">
                                      <img 
                                          src={getItemIcon(child)} 
                                          class="w-full h-full object-contain drop-shadow-sm {child.icon && child.icon.includes('/icons/') ? 'dark:invert' : ''}" 
                                          alt={child.name} 
                                      />
                                  </div>
                                  <span class="text-[11px] text-center line-clamp-2 w-full break-words px-1 rounded 
                                      {selectedItemId === child.id ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-white/10 group-focus:bg-blue-600 group-focus:text-white'}">
                                      {child.name}
                                  </span>
                              </button>
                          {/each}
                         {#if currentFolder.children.length === 0}
                            <div class="col-span-full py-20 text-center text-gray-400">
                                Folder is empty
                            </div>
                         {/if}
                     {/if}
                  </div>
                
                <!-- LIST VIEW -->
                {:else}
                    <div class="w-full min-h-full flex flex-col">
                        <!-- List Header -->
                        <div class="flex items-center px-4 py-1 border-b border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-500 dark:text-gray-400 select-none bg-gray-50 dark:bg-[#282828] sticky top-0 z-10">
                            <div class="flex-1">Name</div>
                            <div class="w-32 hidden sm:block">Kind</div>
                        </div>
                        
                        <!-- List Items -->
                         <div class="flex-1 p-0">
                            {#if currentFolder && currentFolder.children}
                              {#each currentFolder.children as child}
                                  <button 
                                      class="w-full flex items-center px-4 py-2 gap-3 border-b border-gray-100 dark:border-white/5 outline-none group
                                      {selectedItemId === child.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-white/5 odd:bg-white dark:odd:bg-[#1e1e1e] even:bg-gray-50/30 dark:even:bg-[#252525]'}"
                                      onclick={(e) => { e.stopPropagation(); selectedItemId = child.id; }}
                                      ondblclick={(e) => { e.stopPropagation(); navigate(child); }}
                                  >
                                      <div class="w-5 h-5 flex-shrink-0">
                                          <img 
                                              src={getItemIcon(child)} 
                                              class="w-full h-full object-contain {child.icon && child.icon.includes('/icons/') ? 'dark:invert' : ''} {selectedItemId === child.id && child.icon?.includes('/icons/') ? 'invert brightness-0' : ''}" 
                                              alt={child.name} 
                                          />
                                      </div>
                                      <span class="text-sm font-medium truncate flex-1 text-left {selectedItemId === child.id ? 'text-white' : 'text-gray-700 dark:text-gray-200'}">
                                          {child.name}
                                      </span>
                                      <span class="text-xs w-32 hidden sm:block text-left opacity-70 {selectedItemId === child.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'}">
                                          {child.type === 'folder' ? 'Folder' : (child.metadata?.fileType?.toUpperCase() || 'FILE')}
                                      </span>
                                  </button>
                              {/each}
                               {#if currentFolder.children.length === 0}
                                    <div class="py-20 text-center text-gray-400 text-sm">
                                        Folder is empty
                                    </div>
                               {/if}
                            {/if}
                         </div>
                    </div>
                {/if}
             </div>
         </div>
    </div>
</WindowShell>
