
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
    
    let currentFolderId = $state('root-work');
    let history = $state<string[]>([]);
    let historyIndex = $state(0);
    
    $effect(() => {
        // Initialize or update from props
        if (data?.folderId && history.length === 0) {
            currentFolderId = data.folderId;
            history = [data.folderId];
        } else if (history.length === 0) {
            history = ['root-work'];
        }
    });
    
    let currentFolder = $derived(
        findItem(fileSystemList, currentFolderId) || fileSystemList[0]
    );

    function navigate(item: FileSystemItem) {
        if (item.type === 'folder') {
             history = [...history.slice(0, historyIndex + 1), item.id];
             historyIndex++;
             currentFolderId = item.id;
        } else if (item.type === 'file') {
             if (item.name.endsWith('.pdf')) {
                 windowStore.openWindow({ 
                     id: 'resume-' + Date.now(), 
                     title: item.name, 
                     type: 'resume',
                     data: { src: item.content } 
                 });
             } else if (item.metadata?.fileType === 'text') {
                 windowStore.openWindow({ 
                     id: 'text-' + Date.now(), 
                     title: item.name, 
                     type: 'text',
                     data: { content: item.content } 
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

    function goBack() {
        if (historyIndex > 0) {
            historyIndex--;
            currentFolderId = history[historyIndex];
        }
    }
    
    function goForward() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            currentFolderId = history[historyIndex];
        }
    }
</script>

<WindowShell {id} {title}>
    <div class="flex h-full text-gray-800 dark:text-gray-200 font-sans">
         <!-- Sidebar -->
         <div class="w-52 bg-gray-100/90 dark:bg-[#1f1f1f]/95 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 p-3 text-sm flex-shrink-0 flex flex-col pt-5">
             <div class="text-[11px] text-gray-500 dark:text-gray-400 font-bold mb-2 px-3 uppercase tracking-wide opacity-80">Favorites</div>
             <div class="space-y-0.5">
             {#each fileSystemList as fav}
                 <button 
                     class="w-full text-left px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-3 transition-colors {currentFolderId === fav.id ? 'bg-black/10 dark:bg-white/10 sm:font-medium' : 'font-normal'}"
                     onclick={() => {
                        currentFolderId = fav.id;
                        history = [...history, fav.id];
                        historyIndex++;
                     }}
                 >
                     <span class="w-4 h-4 flex items-center justify-center opacity-90">
                        {#if fav.name === 'Work'}<img src="/images/folder.png" class="w-full h-full object-contain" alt="folder" />
                        {:else if fav.name === 'About me'}<img src="/icons/user.svg" class="w-full h-full object-contain dark:invert" alt="user" />
                        {:else if fav.name === 'Resume'}<img src="/images/pdf.png" class="w-full h-full object-contain" alt="resume" />
                        {:else}<img src="/images/folder.png" class="w-full h-full object-contain" alt="folder" />{/if}
                     </span>
                     <span class="truncate">{fav.name}</span>
                 </button>
             {/each}
             </div>
             
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
         
         <!-- Main Area -->
         <div class="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
             <!-- Toolbar (Nav) -->
             <div class="h-12 border-b border-gray-200 dark:border-white/10 flex items-center px-4 gap-4 bg-gray-50/50 dark:bg-[#282828] transition-colors">
                 <div class="flex gap-2">
                     <button class="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors" onclick={goBack} disabled={historyIndex === 0} aria-label="Go back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dark:text-gray-300"><path d="m15 18-6-6 6-6"/></svg>
                     </button>
                      <button class="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition-colors" onclick={goForward} disabled={historyIndex === history.length - 1} aria-label="Go forward">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dark:text-gray-300"><path d="m9 18 6-6-6-6"/></svg>
                     </button>
                 </div>
                 <div class="font-semibold text-sm flex-1 opacity-90 tracking-wide text-center dark:text-gray-200">
                     {currentFolder.name}
                 </div>
                  <div class="w-16 flex justify-end">
                      <img src="/icons/search.svg" class="w-4 h-4 dark:invert opacity-60" alt="Search" />
                  </div>
             </div>
             
             <!-- Content Grid -->
             <div class="flex-1 p-6 grid grid-cols-4 md:grid-cols-5 gap-y-8 gap-x-4 content-start overflow-auto bg-white dark:bg-[#1e1e1e]" onclick={(e) => { if(e.target === e.currentTarget) { /* deselect logic */ } }}>
                 {#if currentFolder && currentFolder.children}
                     {#each currentFolder.children as child}
                         <button 
                             class="flex flex-col items-center gap-2 group outline-none w-24 mx-auto"
                             ondblclick={() => navigate(child)}
                         >
                             <div class="w-16 h-16 transition-transform group-active:scale-95">
                                 {#if child.type === 'folder'}
                                    <img src="/images/folder.png" class="w-full h-full object-contain drop-shadow-sm" alt={child.name} />
                                 {:else if child.type === 'file' && child.name.endsWith('.pdf')}
                                    <img src="/images/pdf.png" class="w-full h-full object-contain drop-shadow-sm" alt={child.name} />
                                 {:else if child.type === 'file' && child.metadata?.fileType === 'image'}
                                    <img src="/images/photos.png" class="w-full h-full object-contain drop-shadow-sm" alt={child.name} />
                                 {:else if child.type === 'link'}
                                    <img src="/images/safari.png" class="w-full h-full object-contain drop-shadow-sm" alt={child.name} />
                                 {:else}
                                    <img src="/images/txt.png" class="w-full h-full object-contain drop-shadow-sm" alt={child.name} />
                                 {/if}
                             </div>
                             <span class="text-[13px] text-center line-clamp-2 w-full break-words px-1 rounded 
                                 {child.type === 'selected' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-white/10 group-focus:bg-blue-600 group-focus:text-white'}">
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
         </div>
    </div>
</WindowShell>
