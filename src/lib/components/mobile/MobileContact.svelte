
<script lang="ts">
  import { mobileNav } from '$lib/stores/mobileNavStore';
</script>
<div class="h-screen bg-[#F2F2F7] dark:bg-black text-black dark:text-white overflow-auto">
    <div class="p-4">
        <button onclick={() => mobileNav.goBack()} class="text-blue-500 mb-6 font-medium text-lg flex items-center">
            <span class="mr-1 text-2xl">‹</span> Back
        </button>
        
        <div class="flex flex-col items-center mb-8">
             <div class="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden">
                <img src="https://placehold.co/200x200?text=A" alt="Avatar" class="w-full h-full object-cover"/>
             </div>
             <h1 class="text-2xl font-bold">Adrian</h1>
             <p class="text-gray-500">Frontend Engineer</p>
        </div>
        
        <div class="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden mb-6">
            <button class="w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center active:bg-gray-100 dark:active:bg-gray-800">
                <span class="text-blue-500">mobile</span>
                <span class="text-gray-400">012-345-6789</span>
            </button>
             <button class="w-full text-left p-4 flex justify-between items-center active:bg-gray-100 dark:active:bg-gray-800">
                <span class="text-blue-500">email</span>
                <span class="text-gray-400">adrian@example.com</span>
            </button>
        </div>
        
        <div class="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
             <button class="w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 text-blue-500 active:bg-gray-100 dark:active:bg-gray-800">
                Send Message
            </button>
             <button class="w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 text-blue-500 active:bg-gray-100 dark:active:bg-gray-800">
                Share Contact
            </button>
             <button class="w-full text-left p-4 text-blue-500 active:bg-gray-100 dark:active:bg-gray-800">
                Add to Favorites
            </button>
        </div>
    </div>
</div>
