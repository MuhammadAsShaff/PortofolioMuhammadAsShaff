
<script lang="ts">
    import WindowShell from './WindowShell.svelte';
    import { blogPosts } from '$lib/data/blog';
    let { id, title, data } = $props();
</script>

<WindowShell {id} {title}>
    <div class="flex flex-col h-full bg-white dark:bg-[#1e1e1e]">
        <!-- Safari Toolbar -->
         <div class="h-12 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4 px-4 sticky top-0 z-10">
             <div class="flex gap-2">
                 <button class="text-gray-500 hover:text-black dark:hover:text-white">&lt;</button>
                 <button class="text-gray-500 hover:text-black dark:hover:text-white">&gt;</button>
             </div>
             <div class="hidden sm:block text-gray-400">
             <button>📄</button>
             </div>
             <div class="flex-1 bg-white dark:bg-gray-700 h-8 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-300 shadow-sm border border-gray-300 dark:border-gray-600 select-all">
                 adrian-portfolio.com/blog
             </div>
             <button class="text-gray-500 hover:text-black dark:hover:text-white">🔄</button>
         </div>
         
         <!-- Content (Blog) -->
         <div class="flex-1 overflow-auto p-8">
            <h1 class="text-3xl font-bold mb-8 text-center text-red-500">My Developer Blog</h1>
            
            <div class="max-w-3xl mx-auto space-y-6">
                 {#each blogPosts as post}
                 <div class="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                     <div class="w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                         <img src={`https://placehold.co/200x150?text=${post.title.substring(0,3)}`} alt="thumb" class="w-full h-full object-cover"/>
                     </div>
                     <div>
                         <div class="text-xs text-gray-500 mb-1">{post.date}</div>
                         <h2 class="text-xl font-bold group-hover:text-blue-500 transition-colors">{post.title}</h2>
                         <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{post.description}</p>
                         <button class="text-blue-500 text-xs mt-2 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Check out the full post &gt;
                         </button>
                     </div>
                 </div>
                 {/each}
            </div>
         </div>
    </div>
</WindowShell>
