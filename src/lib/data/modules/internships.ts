import type { FileSystemItem } from '../types';

export const internshipsData: FileSystemItem = {
    id: 'internships',
    name: 'Internship Experience',
    type: 'folder',
    children: [
        {
            id: 'intern-1',
            name: 'Internship.txt',
            type: 'file',
            content: 'Details about internship experience will be detailed here.',
            metadata: { fileType: 'text' }
        }
    ]
};
