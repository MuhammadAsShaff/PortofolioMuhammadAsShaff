
<script lang="ts">
   import WindowShell from './WindowShell.svelte';
   let { id, title } = $props();
</script>

<WindowShell {id} {title}>
    <div class="h-full bg-gray-50 dark:bg-gray-900 overflow-auto flex flex-col md:flex-row">
        <!-- Sidebar profile -->
        <div class="w-full md:w-64 bg-white dark:bg-black p-6 flex flex-col items-center border-r border-gray-200 dark:border-gray-800 flex-shrink-0">
             <div class="w-32 h-32 rounded-full bg-gray-300 mb-4 overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
                <img src="https://placehold.co/200x200?text=Avatar" alt="Profile" class="w-full h-full object-cover">
             </div>
             <h2 class="text-xl font-bold mb-1">Adrian</h2>
             <p class="text-gray-500 text-sm mb-4">Frontend Engineer</p>
             <button class="px-6 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
                 Follow
             </button>
        </div>
        
        <!-- Content -->
        <div class="flex-1 p-8 md:p-12 overflow-y-auto">
            <h1 class="text-3xl font-bold mb-6">Meet the Developer Behind the Code</h1>
            
            <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                    Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.
                </p>
                <p>
                    I specialize in JavaScript, React, Svelte, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.
                </p>
                <p>
                    I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.
                </p>
                <p>
                    Outside of dev work, you’ll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅
                </p>
            </div>
        </div>
    </div>
</WindowShell>
