
<script lang="ts">
   import WindowShell from './WindowShell.svelte';
   let { id, title } = $props();
   
   const links = [
       { name: 'Schedule a call', color: 'bg-red-400', icon: '📅' },
       { name: 'Email me', color: 'bg-green-500', icon: '✉️' },
       { name: 'Twitter/X', color: 'bg-orange-400', icon: '✖️' },
       { name: 'LinkedIn', color: 'bg-blue-500', icon: '💼' }
   ];
</script>

<WindowShell {id} {title}>
    <div class="h-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
         <div class="max-w-2xl w-full">
            <div class="flex items-center gap-4 mb-8">
                <img src="https://placehold.co/100x100?text=AM" class="w-16 h-16 rounded-full border-2 border-white shadow-sm" alt="Profile">
                <div>
                    <h1 class="text-2xl font-bold">Let's Connect</h1>
                    <p class="text-gray-500">Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each links as link}
                <button class="{link.color} text-white p-6 rounded-xl flex flex-col items-start hover:brightness-110 transition-all shadow-md active:scale-95">
                    <span class="text-2xl mb-2">{link.icon}</span>
                    <span class="font-bold">{link.name}</span>
                </button>
                {/each}
            </div>
         </div>
    </div>
</WindowShell>
