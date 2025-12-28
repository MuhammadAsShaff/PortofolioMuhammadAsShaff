
<script lang="ts">
    import WindowShell from './WindowShell.svelte';
    let { id, title, data } = $props();
</script>

<WindowShell {id} {title}>
    <div class="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 border-[8px] border-gray-200 dark:border-gray-700 overflow-auto">
        <div class="bg-white text-black shadow-lg p-10 max-w-2xl w-full min-h-[400px]">
            <div class="border-b-2 border-black pb-4 mb-4">
                <h1 class="text-4xl font-bold uppercase tracking-widest">RESUME</h1>
                <p class="text-gray-600 font-mono mt-2">Muhammad As Shaff // Frontend Engineer</p>
            </div>
            
            <div class="space-y-6">
                 <section>
                    <h2 class="font-bold border-b border-gray-300 mb-2">SUMMARY</h2>
                    <p class="text-sm">Passionate developer with expertise in building scalable web applications using modern technologies.</p>
                 </section>
                 
                 <section>
                    <h2 class="font-bold border-b border-gray-300 mb-2">EXPERIENCE</h2>
                    <div class="mb-2">
                        <div class="flex justify-between font-semibold text-sm">
                            <span>Senior Frontend Dev</span>
                            <span>2023 - Present</span>
                        </div>
                        <p class="text-xs text-gray-600">Building cool stuff.</p>
                    </div>
                 </section>

                 <div class="mt-8 text-center">
                    {#if data?.src}
                        <a href={data.src} class="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">Download Full PDF</a>
                    {/if}
                 </div>
            </div>
        </div>
    </div>
</WindowShell>
