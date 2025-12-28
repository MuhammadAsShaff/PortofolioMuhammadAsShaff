
<script lang="ts">
    import { mobileNav } from '$lib/stores/mobileNavStore';
    
    const stack = [
        { cat: 'Frontend', items: 'SvelteKit, React, Tailwind, TS' },
        { cat: 'Backend', items: 'Node.js, Python, Rust' },
        { cat: 'Design', items: 'Figma, Adobe XD' },
        { cat: 'Tools', items: 'Git, Docker, Vercel' }
    ];
</script>

<div class="h-screen bg-[#1e1e1e] text-green-400 font-mono p-4 flex flex-col">
    <div class="flex justify-between items-center mb-6 border-b border-green-500/30 pb-2">
        <span class="text-xl font-bold">~/tech-stack</span>
        <button onclick={() => mobileNav.goBack()} class="text-green-500 border border-green-500 px-2 py-1 text-xs rounded hover:bg-green-500/10">EXIT</button>
    </div>
    
    <div class="flex-1 space-y-4 overflow-auto">
        <p>> fetch_skills</p>
        <p>> [SUCCESS] Data retrieved.</p>
        
        <div class="mt-4 border border-green-500/50 rounded p-2">
             {#each stack as s}
                 <div class="mb-4">
                     <span class="text-white font-bold block mb-1">[{s.cat}]</span>
                     <span class="pl-4 block text-green-300">{s.items}</span>
                 </div>
             {/each}
        </div>
        
        <p class="animate-pulse mt-4">_</p>
    </div>
    
    <div class="h-16 border-t border-green-500/30 flex justify-around items-center text-xs pb-2">
        <button class="flex flex-col items-center text-green-400">
            <span class="text-xl">⚡</span>
            <span>Stack</span>
        </button>
         <button class="flex flex-col items-center text-green-400/50">
            <span class="text-xl">📜</span>
            <span>Cert</span>
        </button>
    </div>
</div>
