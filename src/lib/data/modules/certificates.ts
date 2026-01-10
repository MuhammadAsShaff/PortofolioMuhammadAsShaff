import type { FileSystemItem } from '../types';

export const certificatesData: FileSystemItem = {
    id: 'certificates',
    name: 'Course Certificates',
    type: 'folder',
    children: [
        {
            id: 'cert-pytorch-folder',
            name: 'FREE PyTorch Bootcamp',
            type: 'folder',
            children: [
                {
                    id: 'cert-pytorch-bootcamp',
                    name: 'Sertifikat.docx',
                    type: 'file',
                    content: '',
                    metadata: { 
                        fileType: 'doc',
                        docData: {
                            title: 'FREE PyTorch Bootcamp',
                            issuer: 'OpenCV University',
                            date: 'Diterbitkan Okt 2025',
                            description: `ID Kredensial: 80cf3f921d91403e9cb8b8441b6bbbcc

Sertifikat penghargaan atas penyelesaian FREE PyTorch Bootcamp dari OpenCV University.`
                        }
                    }
                }
            ]
        },
        {
            id: 'cert-ccna-folder',
            name: 'CCNAv7 Introduction to Networks',
            type: 'folder',
            children: [
                {
                    id: 'cert-ccna',
                    name: 'Sertifikat.docx',
                    type: 'file',
                    content: '',
                    metadata: { 
                        fileType: 'doc',
                        docData: {
                            title: 'CCNAv7: Introduction to Networks',
                            issuer: 'Cisco',
                            date: 'Diterbitkan Agu 2024',
                            description: `Keahlian: Router Configuration · Configuring Switches · IPv4 · IPv6

Sertifikat Jaringan Oleh Cisco.`
                        }
                    }
                }
            ]
        },
        {
            id: 'cert-ml-folder',
            name: 'Belajar Machine Learning untuk Pemula',
            type: 'folder',
            children: [
                {
                    id: 'cert-dicoding-ml',
                    name: 'Sertifikat.docx',
                    type: 'file',
                    content: '',
                    metadata: { 
                        fileType: 'doc',
                        docData: {
                            title: 'Belajar Machine Learning untuk Pemula',
                            issuer: 'Dicoding Indonesia',
                            date: 'Diterbitkan Jun 2024 - Kedaluwarsa Jun 2027',
                            description: `ID Kredensial: 98XWL5160ZM3

Keahlian: Data Analysis · Data Visualization · Mechine Learning`
                        }
                    }
                }
            ]
        },
        {
            id: 'cert-python-folder',
            name: 'Memulai Pemrograman dengan Python',
            type: 'folder',
            children: [
                {
                    id: 'cert-dicoding-python',
                    name: 'Sertifikat.docx',
                    type: 'file',
                    content: '',
                    metadata: { 
                        fileType: 'doc',
                        docData: {
                            title: 'Memulai Pemrograman dengan Python',
                            issuer: 'Dicoding Indonesia',
                            date: 'Diterbitkan Apr 2024 - Kedaluwarsa Apr 2027',
                            description: `ID Kredensial: 53XEOLWO9ZRN

Keahlian: Programming · Data Analysis`
                        }
                    }
                }
            ]
        },
        {
            id: 'cert-viz-folder',
            name: 'Belajar Dasar Visualisasi Data',
            type: 'folder',
            children: [
                {
                    id: 'cert-dicoding-viz',
                    name: 'Sertifikat.docx',
                    type: 'file',
                    content: '',
                    metadata: { 
                        fileType: 'doc',
                        docData: {
                            title: 'Belajar Dasar Visualisasi Data',
                            issuer: 'Dicoding Indonesia',
                            date: 'Diterbitkan Mar 2024 - Kedaluwarsa Mar 2027',
                            description: `ID Kredensial: 1OP8N9GGQXQK

Keahlian: Data Analysis · Data Visualization`
                        }
                    }
                }
            ]
        }
    ]
};
