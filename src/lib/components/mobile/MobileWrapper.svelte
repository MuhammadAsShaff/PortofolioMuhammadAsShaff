
<script lang="ts">
    import { mobileNav } from '$lib/stores/mobileNavStore';
    import MobileHome from './MobileHome.svelte';
    import MobileWork from './MobileWork.svelte';
    import MobilePhotos from './MobilePhotos.svelte';
    import MobileSafari from './MobileSafari.svelte';
    import MobileContact from './MobileContact.svelte';
    import MobileAbout from './MobileAbout.svelte';
    import MobileTechStack from './MobileTechStack.svelte';
    import MobileDocument from './MobileDocument.svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
</script>

<div class="fixed inset-0 overflow-hidden bg-black">
    {#key $mobileNav.page}
        <div 
            class="absolute inset-0 w-full h-full bg-white dark:bg-black"
            in:fly={{ x: 300, duration: 400, easing: cubicOut }}
            out:fly={{ x: -100, duration: 300, opacity: 0.5, easing: cubicOut }}
        >
            {#if $mobileNav.page === 'home'}
                <MobileHome />
            {:else if $mobileNav.page === 'work'}
                <MobileWork />
            {:else if $mobileNav.page === 'photos'}
                <MobilePhotos />
            {:else if $mobileNav.page === 'safari'}
                <MobileSafari />
            {:else if $mobileNav.page === 'contact'}
                <MobileContact />
            {:else if $mobileNav.page === 'tech'}
                <MobileTechStack />
            {:else if $mobileNav.page === 'about'}
                <MobileAbout />
             {:else if $mobileNav.page === 'document'}
                <MobileDocument />
            {:else}
                <div class="h-full flex items-center justify-center flex-col gap-4">
                     <!-- Fallback -->
                     <button onclick={() => mobileNav.goBack()}>Back</button>
                </div>
            {/if}
        </div>
    {/key}
</div>
