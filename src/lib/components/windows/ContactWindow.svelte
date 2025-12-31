
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
            <div class="flex items-center gap-6 mb-10">
                <div class="w-20 h-20 rounded-full border-2 border-white dark:border-gray-700 shadow-md overflow-hidden flex-shrink-0">
                    <img src="/images/fotoprofil.JPG" class="w-full h-full object-cover" alt="Muhammad As Shaff">
                </div>
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Muhammad As Shaff</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-1">UI/UX Designer | AI Engineer | Data Engineer</p>
                    <p class="text-gray-500 dark:text-gray-500 text-sm mt-1">Tertarik untuk berkolaborasi atau ingin mengenal saya lebih dekat? Silakan hubungi saya melalui kontak di bawah ini.</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="mailto:as22si@mahasiswa.pcr.ac.id" class="bg-green-500 text-white p-6 rounded-xl flex flex-col items-start hover:brightness-110 transition-all shadow-md active:scale-95 group">
                    <span class="text-3xl mb-3 bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">✉️</span>
                    <span class="font-bold text-lg">Email Me</span>
                    <span class="text-green-100 text-xs mt-1 font-mono">as22si@mahasiswa.pcr.ac.id</span>
                </a>
                
                <a href="https://www.linkedin.com/in/muhammad-as-shaff-399b8a296/" target="_blank" rel="noopener noreferrer" class="bg-blue-600 text-white p-6 rounded-xl flex flex-col items-start hover:brightness-110 transition-all shadow-md active:scale-95 group">
                    <span class="text-3xl mb-3 bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">💼</span>
                    <span class="font-bold text-lg">LinkedIn</span>
                    <span class="text-blue-200 text-xs mt-1">Connect professionally</span>
                </a>

                <a href="https://github.com/MuhammadAsShaff" target="_blank" rel="noopener noreferrer" class="bg-gray-800 text-white p-6 rounded-xl flex flex-col items-start hover:brightness-110 transition-all shadow-md active:scale-95 group">
                    <span class="text-3xl mb-3 bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors dark:invert">👾</span>
                    <span class="font-bold text-lg">GitHub</span>
                    <span class="text-gray-300 text-xs mt-1">Check out my code</span>
                </a>

                <div class="bg-orange-400 text-white p-6 rounded-xl flex flex-col items-start shadow-md opacity-90">
                     <span class="text-3xl mb-3 bg-white/20 p-2 rounded-lg">📅</span>
                    <span class="font-bold text-lg">Schedule Call</span>
                     <span class="text-orange-100 text-xs mt-1">Coming soon...</span>
                </div>
            </div>
         </div>
    </div>
</WindowShell>
