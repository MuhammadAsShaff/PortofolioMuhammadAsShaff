
<script lang="ts">
    import WindowShell from './WindowShell.svelte';
    let { id, title, data } = $props();
</script>

<WindowShell {id} {title}>
    <div class="h-full overflow-auto bg-white dark:bg-[#1e1e1e] p-8 md:p-12">
        <div class="max-w-3xl mx-auto">
            {#if data?.image}
                 <div class="float-start mr-8 mb-6">
                    <div class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10">
                        <img src={data.image} alt={title} class="w-full h-full object-cover pointer-events-none" />
                    </div>
                 </div>
            {/if}
            <div class="font-mono text-base md:text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap pt-2">
                {data?.content || 'No content'}
            </div>
            <!-- Clear fix -->
             <div class="clear-both"></div>
        </div>
    </div>
</WindowShell>
