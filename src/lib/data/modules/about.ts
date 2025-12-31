import type { FileSystemItem } from '../types';

export const aboutData: FileSystemItem = {
    id: 'about-me',
    name: 'About Me.txt',
    type: 'file',
    content: `Saya adalah Muhammad As Shaff, mahasiswa Sistem Informasi yang memiliki ketertarikan pada bidang Artificial Intelligence, Data, dan Design.

Saya tertarik pada bagaimana data dapat diolah menjadi insight yang bernilai, bagaimana model AI dapat membantu pengambilan keputusan, serta bagaimana desain dapat meningkatkan pengalaman pengguna.

Selama perkuliahan, saya aktif mengembangkan kemampuan melalui proyek akademik, pembelajaran mandiri, dan pengalaman yang mendukung pengembangan solusi berbasis teknologi.

Saya memiliki semangat untuk terus belajar dan berkontribusi dalam pengembangan solusi digital yang efektif, inovatif, dan berorientasi pada kebutuhan pengguna.`,
    metadata: { fileType: 'text', image: '/images/fotoprofil.JPG' }
};
