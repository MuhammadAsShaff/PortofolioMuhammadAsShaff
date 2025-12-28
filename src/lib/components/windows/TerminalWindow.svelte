
<script lang="ts">
    import WindowShell from './WindowShell.svelte';
    let { id, title } = $props();
    
    const lines = [
        "> Welcome to my portfolio",
        "> loading tech_stack.json...",
        "> check_skills --verbose",
        "  - Frontend: SvelteKit, React, Tailwind, TypeScript",
        "  - Backend: Node.js, Python, Rust (learning)",
        "  - Tools: Figma, Git, Docker",
        "> echo 'Thanks for visiting!'"
    ];
</script>

<WindowShell {id} {title}>
    <div class="p-4 bg-[#1e1e1e] text-green-400 font-mono text-sm h-full overflow-auto selection:bg-green-500/30">
        {#each lines as line}
            <div class="mb-1">{line}</div>
        {/each}
        <div class="animate-pulse">_</div>
    </div>
</WindowShell>
