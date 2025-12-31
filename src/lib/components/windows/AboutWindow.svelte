
<script lang="ts">
   import WindowShell from './WindowShell.svelte';
   let { id, title } = $props();
</script>

<WindowShell {id} {title}>
    <div class="h-full bg-gray-50 dark:bg-gray-900 overflow-auto flex flex-col md:flex-row">
        <!-- Sidebar profile -->
        <div class="w-full md:w-72 bg-white dark:bg-black p-6 flex flex-col items-center border-r border-gray-200 dark:border-gray-800 flex-shrink-0">
             <div class="w-32 h-32 rounded-full bg-gray-300 mb-4 overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
                <img src="/images/fotoprofil.JPG" alt="Profile" class="w-full h-full object-cover">
             </div>
             <h2 class="text-xl font-bold mb-1 text-center">Muhammad As Shaff</h2>
             <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">UI/UX Designer | AI Engineer | Data Engineer</p>
             
             <div class="flex gap-2 mb-6">
                 <a href="https://github.com/muhammad-as-shaff" target="_blank" rel="noopener noreferrer" class="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="GitHub">
                     <img src="/icons/github.svg" class="w-5 h-5 dark:invert" alt="GitHub" />
                 </a>
                 <a href="https://www.linkedin.com/in/muhammad-as-shaff-399b8a296/" target="_blank" rel="noopener noreferrer" class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors" title="LinkedIn">
                     <img src="/icons/linkedin.svg" class="w-5 h-5" alt="LinkedIn" />
                 </a>
                 <a href="mailto:as22si@mahasiswa.pcr.ac.id" class="p-2 bg-red-50 dark:bg-red-900/20 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors" title="Email">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                 </a>
             </div>

             <div class="w-full space-y-3">
                <div class="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-2">Contact</div>
                <div class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 break-all">
                    <span class="w-5 flex-shrink-0 opacity-60">📧</span>
                    <a href="mailto:as22si@mahasiswa.pcr.ac.id" class="hover:underline">as22si@mahasiswa.pcr.ac.id</a>
                </div>
             </div>
        </div>
        
        <!-- Content -->
        <div class="flex-1 p-8 md:p-12 overflow-y-auto">
            <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h1>
            
            <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                    Hi, I'm <strong>Muhammad As Shaff</strong>! 👋
                </p>
                <p>
                    I am a passionate technology enthusiast with a focus on <strong>AI Engineering</strong>, <strong>Data Engineering</strong>, and <strong>Design</strong>. 
                </p>
                <p>
                   I strive to build intelligent systems and beautiful, user-friendly interfaces. My goal is to leverage technology to solve real-world problems and create impactful experiences.
                </p>
                <p>
                    Whether I'm actively coding, designing a new interface, or exploring the latest in AI, I'm always looking for ways to push the boundaries of what's possible.
                </p>
            </div>
        </div>
    </div>
</WindowShell>
