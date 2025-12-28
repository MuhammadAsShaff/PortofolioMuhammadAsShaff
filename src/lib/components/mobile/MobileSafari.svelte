
<script lang="ts">
  import { mobileNav } from '$lib/stores/mobileNavStore';
  import { blogPosts } from '$lib/data/blog';
</script>
<div class="h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
    <div class="h-12 border-b dark:border-gray-800 flex items-center px-4 justify-between bg-gray-100 dark:bg-gray-900">
        <button onclick={() => mobileNav.goBack()} class="text-blue-500 font-bold">Done</button>
        <span class="text-sm font-semibold">adrian-portfolio.com</span>
        <button class="text-blue-500">🔄</button>
    </div>
    <div class="flex-1 overflow-auto p-4">
        {#each blogPosts as post}
             <div class="mb-6 border-b dark:border-gray-800 pb-4">
                 <h2 class="text-xl font-bold mb-1">{post.title}</h2>
                 <p class="text-xs text-gray-500 mb-2">{post.date}</p>
                 <p class="text-sm text-gray-700 dark:text-gray-300">{post.description}</p>
             </div>
        {/each}
    </div>
    <div class="h-12 border-t dark:border-gray-800 flex items-center justify-around text-blue-500">
        <span>‹</span>
        <span>›</span>
        <span>Share</span>
        <span>Tabs</span>
    </div>
</div>
