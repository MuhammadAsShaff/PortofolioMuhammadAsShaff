
export type FileType = 'folder' | 'file' | 'link';

export interface FileSystemItem {
    id: string;
    name: string;
    type: FileType;
    icon?: string;
    content?: string;
    children?: FileSystemItem[];
    metadata?: Record<string, any>;
}

export const fileSystemList: FileSystemItem[] = [
    {
        id: 'root-work',
        name: 'Work',
        type: 'folder',
        children: [
            {
                id: 'proj1',
                name: 'Project 1 (SnapCast)',
                type: 'folder',
                children: [],
                metadata: { description: 'A revolutionary podcasting platform.' }
            },
            {
                id: 'proj2',
                name: 'Project 2 (Converso)',
                type: 'folder',
                children: [
                    {
                        id: 'proj2-case',
                        name: 'Full case study',
                        type: 'folder',
                        children: []
                    },
                     {
                        id: 'proj2-shot1',
                        name: 'Screenshot.png',
                        type: 'file',
                        content: 'placeholder',
                        metadata: { fileType: 'image' }
                    },
                    {
                        id: 'proj2-link',
                        name: 'converso.com',
                        type: 'link',
                        content: 'https://example.com'
                    },
                    {
                        id: 'proj2-tldr',
                        name: 'TLDR.txt',
                        type: 'file',
                        content: 'Converso is a messaging app focused on privacy and speed. Built with Rust and React.',
                        metadata: { fileType: 'text' }
                    }
                ]
            },
             {
                id: 'proj3',
                name: 'Project 3 (PrepWise)',
                type: 'folder',
                children: []
            },
             {
                id: 'proj4',
                name: 'Project 4 (Bookwise)',
                type: 'folder',
                children: []
            }
        ]
    },
    {
        id: 'root-about',
        name: 'About me',
        type: 'folder',
        children: [
            {
                id: 'bio',
                name: 'bio.txt',
                type: 'file',
                content: `Hi, I'm Muhammad As Shaff.

I am a passionate Frontend Engineer with a knack for building beautiful, responsive, and user-friendly web applications.
I love svelte and macos designs!`,
                metadata: { fileType: 'text' }
            }
        ]
    },
    {
        id: 'root-resume',
        name: 'Resume',
        type: 'folder',
        children: [
            {
                id: 'resume-file',
                name: 'Resume.pdf',
                type: 'file',
                content: '/resume.pdf',
                metadata: { fileType: 'pdf' }
            }
        ]
    }
];
