<script lang="ts">
  import { mobileNav } from '$lib/stores/mobileNavStore';
</script>

<div class="h-screen flex flex-col bg-gray-50 dark:bg-black text-black dark:text-white">
    <!-- Navbar (Matches MobileDocument) -->
    <div class="h-12 flex items-end justify-between px-4 pb-2 bg-white dark:bg-[#1c1c1e] border-b border-gray-200 dark:border-gray-800 shrink-0 z-10">
         <button class="text-[#007AFF] font-medium flex items-center text-lg active:opacity-50" onclick={() => mobileNav.goBack()}>
             <span class="mr-1 text-2xl leading-none">‹</span> Back
         </button>
         <span class="font-semibold text-lg">About Me</span>
         <div class="w-10"></div> <!-- Spacer -->
    </div>

    <!-- Content (Matches MobileDocument structure) -->
    <div class="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
         <div class="bg-white text-black shadow-sm p-6 sm:p-8 max-w-[800px] w-full mx-auto min-h-full text-sm rounded-none sm:rounded-lg">
            
            <div class="flex flex-col items-center mb-8 border-b-2 border-black pb-8">
                <div class="w-32 h-40 bg-gray-200 flex-shrink-0 overflow-hidden border border-gray-300 mb-4 shadow-sm">
                     <img src="/images/fotoprofil.JPG" alt="Muhammad As Shaff" class="w-full h-full object-cover" />
                </div>
                <h2 class="text-2xl font-bold mb-1 text-center">Muhammad As Shaff</h2>
                <span class="text-sm text-gray-600 font-medium tracking-wide">Mahasiswa Sistem Informasi</span>
            </div>
            
            <div class="space-y-4 text-sm leading-relaxed text-justify text-gray-800">
                <p>
                    Saya adalah Muhammad As Shaff, mahasiswa Sistem Informasi yang memiliki ketertarikan pada bidang Artificial Intelligence, Data, dan Design.
                </p>
                <p>
                    Saya tertarik pada bagaimana data dapat diolah menjadi insight yang bernilai, bagaimana model AI dapat membantu pengambilan keputusan, serta bagaimana desain dapat meningkatkan pengalaman pengguna.
                </p>
                <p>
                    Selama perkuliahan, saya aktif mengembangkan kemampuan melalui proyek akademik, pembelajaran mandiri, dan pengalaman yang mendukung pengembangan solusi berbasis teknologi.
                </p>
                <p>
                    Saya memiliki semangat untuk terus belajar dan berkontribusi dalam pengembangan solusi digital yang efektif, inovatif, dan berorientasi pada kebutuhan pengguna.
                </p>
            </div>

            <!-- Social Links (Optional addition since we are matching CV style) -->
            <div class="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-6 safe-area-bottom">
                 <a href="https://linkedin.com/in/muhammad-as-shaff-399b8a296/" target="_blank" class="text-gray-400 hover:text-black transition-colors">
                    <img src="/images/linkedin.png" alt="LinkedIn" class="w-6 h-6 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all" />
                 </a>
                 <a href="https://github.com/MuhammadAsShaff" target="_blank" class="text-gray-400 hover:text-black transition-colors">
                    <img src="/images/github.png" alt="GitHub" class="w-6 h-6 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all" />
                 </a>
            </div>

         </div>
    </div>
</div>

<style>
   .safe-area-bottom {
       padding-bottom: env(safe-area-inset-bottom);
   }
</style>
