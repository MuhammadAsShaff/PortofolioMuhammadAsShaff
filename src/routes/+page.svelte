
<script lang="ts">
    import { onMount } from 'svelte';
    import Desktop from '$lib/components/desktop/Desktop.svelte';
    import MobileWrapper from '$lib/components/mobile/MobileWrapper.svelte';
    import { mobileNav } from '$lib/stores/mobileNavStore';
    
    let isMobile = $state(false);
    let mounted = $state(false);
    
    onMount(() => {
        isMobile = window.innerWidth < 1024;
        window.addEventListener('resize', () => { isMobile = window.innerWidth < 1024; });
        mounted = true;
    });
</script>

<svelte:head>
    <title>Muhammad As Shaff's Portfolio</title>
</svelte:head>

<div class="w-full h-full bg-gray-900 text-white">
    {#if mounted}
        {#if isMobile}
            <MobileWrapper />
        {:else}
            <Desktop />
        {/if}
    {:else}
        <div class="h-screen w-full flex items-center justify-center bg-black">
            Loading...
        </div>
    {/if}
</div>
