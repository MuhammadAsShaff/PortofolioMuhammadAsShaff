
<script lang="ts">
    import WindowShell from './WindowShell.svelte';
    let { id, title, data } = $props();
</script>

<WindowShell {id} {title}>
    <div class="p-6 h-full font-mono text-gray-800 dark:text-gray-200 overflow-auto whitespace-pre-wrap">
        {data?.content || 'No content'}
    </div>
</WindowShell>
