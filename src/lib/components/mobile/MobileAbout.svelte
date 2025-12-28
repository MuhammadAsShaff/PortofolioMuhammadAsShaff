
<script lang="ts">
  import { mobileNav } from '$lib/stores/mobileNavStore';
</script>
<div class="h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
    <div class="flex items-center justify-between p-4 border-b dark:border-gray-800">
         <h1 class="text-2xl font-bold">About</h1>
         <button onclick={() => mobileNav.goBack()} class="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-500">
            ✕
         </button>
    </div>
    <div class="p-6 overflow-auto">
        <p class="text-lg leading-relaxed mb-4">
            Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.
        </p>
        <p class="text-lg leading-relaxed">
             I specialize in JavaScript, React, Svelte, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.
        </p>
    </div>
</div>
