<script lang="ts">
    import { mobileNav } from '$lib/stores/mobileNavStore';
    
    // We expect 'data' to contain the same structure as ResumeWindow receives:
    // either { docData: ... } for generic docs
    // or empty/undefined for the main CV
    let { data } = $mobileNav;
    
    // If we navigated here with a specific file metadata (like docData), use it.
    // If it's the main CV, data might be empty or just {}.
    
    // We'll reuse the exact design from ResumeWindow but wrapper for mobile.
</script>

<div class="h-screen flex flex-col bg-gray-50 dark:bg-black text-black dark:text-white">
    <!-- Navbar -->
    <div class="h-12 flex items-end justify-between px-4 pb-2 bg-white dark:bg-[#1c1c1e] border-b border-gray-200 dark:border-gray-800 shrink-0">
         <button class="text-[#007AFF] font-medium flex items-center text-lg active:opacity-50" onclick={() => mobileNav.goBack()}>
             <span class="mr-1 text-2xl leading-none">‹</span> Back
         </button>
         <span class="font-semibold text-lg truncate max-w-[200px]">{data?.docData ? 'Document' : 'Curriculum Vitae'}</span>
         <div class="w-10"></div> <!-- Spacer -->
    </div>

    <!-- Content - REUSED FROM Desktop ResumeWindow.svelte -->
    <div class="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
         <div class="bg-white text-black shadow-sm p-6 sm:p-8 max-w-[800px] w-full mx-auto min-h-full text-sm rounded-none sm:rounded-lg">
            
            {#if data?.docData}
                 <!-- Dynamic Document View (for Projects, Awards, etc.) -->
                 <div class="mb-8 border-b-2 border-black pb-6">
                    <h1 class="text-2xl font-bold mb-2 leading-tight">{data.docData.title}</h1>
                    <div class="text-xs text-gray-700 font-bold uppercase tracking-wider mb-4">
                        {data.docData.issuer} • {data.docData.date}
                    </div>
                </div>
                
                <div class="text-sm leading-relaxed text-justify space-y-4">
                     {#each data.docData.description.split('\n') as paragraph}
                        <p>{paragraph}</p>
                     {/each}
                </div>
            {:else}
                <!-- Default Resume Content (Hardcoded matches Desktop) -->
                <!-- Header -->
                <div class="flex flex-col gap-6 mb-8 border-b-2 border-black pb-10">
                    <!-- Profile Photo -->
                    <div class="w-32 h-40 bg-gray-200 flex-shrink-0 overflow-hidden border border-gray-300 self-center sm:self-start">
                         <img src="/images/fotoprofil.JPG" alt="Profile" class="w-full h-full object-cover" />
                    </div>
                    
                    <!-- Contact Info -->
                    <div class="flex-1">
                        <h1 class="text-3xl font-bold mb-2 text-center sm:text-left">Muhammad As Shaff</h1>
                        <div class="text-[11px] text-gray-700 space-y-2 mb-3 text-center sm:text-left">
                            <p class="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <span>+628984818977</span> |
                                <span>as22si@mahasiswa.pcr.ac.id</span>
                            </p>
                            <p class="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <a href="https://www.linkedin.com/in/muhammad-as-shaff-399b8a296/" target="_blank" class="text-blue-700 hover:underline">LinkedIn</a> |
                                <a href="https://github.com/MuhammadAsShaff" target="_blank" class="text-blue-700 hover:underline">GitHub</a> |
                                <a href="https://www.behance.net/MuhammadAsShaff61" target="_blank" class="text-blue-700 hover:underline">Behance</a>
                            </p>
                            <p>Jl.Tegalsari, GG.Mekarsari, No.12, Pekanbaru</p>
                        </div>
                        <p class="text-xs text-justify leading-relaxed">
                            Mahasiswa semester 4 jurusan Sistem Informasi yang memiliki minat karier di bidang Data dan UI/UX. 
                            Selama berkuliah memiliki pengalaman dalam organisasi menjalankan beberapa projek acara serta menjadi aktif 
                            dalam kepengurusan sebagai penanggung jawab Departemen Kominfo. Memiliki kemampuan komunikasi yang efektif 
                            dan memiliki kemampuan analisis, visualisasi data serta desain.
                        </p>
                    </div>
                </div>
    
                <!-- Sections -->
                <div class="space-y-6">
                    
                    <!-- Pendidikan -->
                    <section>
                        <h2 class="text-lg font-bold border-b border-black mb-3">Pendidikan</h2>
                        <div class="mb-4">
                            <div class="flex flex-col sm:flex-row justify-between font-bold">
                                <span>Politeknik Caltex Riau <span class="font-normal text-gray-700 block sm:inline">(Pekanbaru, Indonesia)</span></span>
                                <span class="text-xs mt-1 sm:mt-0">Sep 2022 - Sep 2026 (Diharapkan)</span>
                            </div>
                            <div class="text-xs mt-1">Sistem Informasi - 3.80/4.00</div>
                            <div class="text-xs text-gray-600 mt-1 italic">
                                Mata kuliah relevan: Desain Pengalaman Pengguna, Data Mining, Visualisasi Data, Basis Data, Pemrograman
                            </div>
                        </div>
                        <div>
                            <div class="flex flex-col sm:flex-row justify-between font-bold">
                                <span>SMAN 3 Pekanbaru <span class="font-normal text-gray-700 block sm:inline">(Pekanbaru, Indonesia)</span></span>
                                <span class="text-xs mt-1 sm:mt-0">Juli 2019 - May 2022</span>
                            </div>
                        </div>
                    </section>
    
                    <!-- Pengalaman -->
                    <section>
                        <h2 class="text-lg font-bold border-b border-black mb-3">Pengalaman</h2>
                        <div class="space-y-4">
                            <!-- Item 1 -->
                            <div>
                                <div class="flex flex-col sm:flex-row justify-between font-bold">
                                    <span>• Membuat Sistem Keuangan Puskesmas Umban Sari</span>
                                    <span class="text-xs mt-1 sm:mt-0">Juli 2023 - Januari 2024</span>
                                </div>
                                <p class="text-xs pl-3 text-gray-700 mt-1">Membuat Sistem Keuangan berbasis Web Laravel untuk Puskesmas Umban Sari</p>
                            </div>
                             <!-- Item 2 -->
                            <div>
                                <div class="flex flex-col sm:flex-row justify-between font-bold">
                                    <span>• Membuat UI/UX Aplikasi Donasi Barang bekas BeWise</span>
                                    <span class="text-xs mt-1 sm:mt-0">Agustus 2023 - Januari 2024</span>
                                </div>
                                <p class="text-xs pl-3 text-gray-700 mt-1">Membuat UI/UX dengan metode desain Thinking dan Penggunaan Figma</p>
                            </div>
                             <!-- Item 3 -->
                            <div>
                                <div class="flex flex-col sm:flex-row justify-between font-bold">
                                    <span>• Membuat Sistem Klasifikasi Dengan Mechine Learning</span>
                                    <span class="text-xs mt-1 sm:mt-0">Sekarang</span>
                                </div>
                                <p class="text-xs pl-3 text-gray-700 mt-1">Membuat Sistem yang dapat mendeteksi gambar yang di inputkan</p>
                            </div>
                        </div>
                    </section>
    
                    <!-- Pelatihan & Sertifikat -->
                     <section>
                        <h2 class="text-lg font-bold border-b border-black mb-3">Pelatihan Dan Sertifikat</h2>
                        <div class="space-y-3 text-xs">
                            <div>
                                <span class="font-bold block mb-1">• Pemograman Python, Dicoding</span>
                                <p class="pl-3 text-gray-700">Modul: Ekspresi, Aksi Sekuensial, Control Flow, Array dan Pemrosesannya, Matriks, Subprogram, Object Oriented Programing, Style Guide pada Pyhton, Unit Testing, Library Populer Pada Python</p>
                            </div>
                            <div>
                                <span class="font-bold block mb-1">• Visualisasi Data, Dicoding</span>
                                <p class="pl-3 text-gray-700">Modul: Persiapan Data PraVisualisasi, Transformasi Data ke Visual</p>
                            </div>
                            <div>
                                <span class="font-bold block mb-1">• Machine Learning</span>
                                <p class="pl-3 text-gray-700">Modul: Pengenalan Data, Supervised dan Unsupervised Learning, Support Vector Machine, Dasar Dasar Machine Learning, Neural Network, Tensor Flow</p>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Aktivitas Organisasi -->
                     <section>
                        <h2 class="text-lg font-bold border-b border-black mb-3">Aktivitas Organisasi</h2>
                        <div class="space-y-4">
                             <div>
                                <div class="flex flex-col sm:flex-row justify-between font-bold">
                                    <span>• Departemen Kominfo HIMASITIFO (Himpunan Mahasiswa Sistem Informasi)</span>
                                    <span class="text-xs mt-1 sm:mt-0">2023 - 2024</span>
                                </div>
                                <div class="text-xs pl-3 italic mt-0.5">Penanggung Jawab Departemen</div>
                                <p class="text-xs pl-3 text-gray-700 mt-1">Memberikan informasi melalui media sosial, editing serta dokumentasi kegiatan</p>
                            </div>
                            <div>
                                <div class="flex flex-col sm:flex-row justify-between font-bold">
                                    <span>• PMB Basketball Competition 2023</span>
                                    <span class="text-xs mt-1 sm:mt-0">Desember 2023</span>
                                </div>
                                 <div class="text-xs pl-3 italic mt-0.5">Koordinator Divisi Dokumentasi</div>
                                <p class="text-xs pl-3 text-gray-700 mt-1">Kegiatan perlombaan basket oleh Penerimaan Mahasiswa Baru Politeknik Caltex Riau</p>
                            </div>
                            <div>
                                <div class="flex flex-col sm:flex-row justify-between font-bold">
                                    <span>• JTI Expo 2024</span>
                                    <span class="text-xs mt-1 sm:mt-0">Juni 2024 - Sekarang</span>
                                </div>
                                 <div class="text-xs pl-3 italic mt-0.5">Koordinator Divisi Dokumentasi</div>
                                <p class="text-xs pl-3 text-gray-700 mt-1">Kegiatan Expo dari project mahasiswa Politeknik Caltex Riau Jurusan Teknologi Informasi</p>
                            </div>
                        </div>
                     </section>
    
                <!-- Pencapaian -->
                 <section>
                    <h2 class="text-lg font-bold border-b border-black mb-3">Pencapaian</h2>
                    <div class="space-y-2 text-xs">
                        <div class="flex flex-col sm:flex-row justify-between">
                            <span class="font-bold">• Juara 2 Workshop PKM dan Business Plan</span>
                            <span class="text-gray-600 sm:text-black">Maret 2023</span>
                        </div>
                         <div class="flex flex-col sm:flex-row justify-between">
                            <span class="font-bold">• Finalis 5 Besar Lomba UI/UX HI-TECH 6</span>
                            <span class="text-gray-600 sm:text-black">Juni 2024</span>
                        </div>
                    </div>
                 </section>
                 
                  <!-- Keterampilan -->
                 <section>
                    <h2 class="text-lg font-bold border-b border-black mb-3">Keterampilan</h2>
                    <div class="text-xs space-y-2">
                        <p><span class="font-bold">• Bahasa:</span> Bahasa Indonesia</p>
                        <p><span class="font-bold">• Tools:</span> Microsoft Office (Excel, Word, Power Point, Power BI, Project), Google Workspace, Visual Studio Code, Git, Cisco Packet Tracer, XAMPP, Figma, Canva, Lucid Chart, Google Colab</p>
                        <p><span class="font-bold">• Hard Skills:</span> UI/UX Desain, UX Research, Analisis Data dan Statistik, Visualisasi Data, Manajemen Data</p>
                        <p><span class="font-bold">• Soft Skills:</span> Pemecahan Masalah, Kemampuan Beradaptasi Cepat, Komunikasi Tim, Manajemen Waktu</p>
                    </div>
                 </section>
            </div>
            {/if}
            
             <!-- Download Action (Only for explicit files or main CV) -->
             {#if !data?.docData || data?.src}
              <div class="mt-8 pt-6 border-t border-gray-100 text-center pb-8 safe-area-bottom">
                 <!-- Use static link for CV or data.src if available -->
                 <a href={data?.src || '/files/CV Magang Muhammad As Shaff.pdf'} target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors text-xs font-bold uppercase tracking-wide">
                     <span>Download PDF Asli</span>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                 </a>
              </div>
             {/if}

         </div>
    </div>
</div>

<style>
   .safe-area-bottom {
       padding-bottom: env(safe-area-inset-bottom);
   }
</style>
