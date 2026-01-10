import type { FileSystemItem } from '../types';

export const internshipsData: FileSystemItem = {
    id: 'internships',
    name: 'Internship Experience',
    type: 'folder',
    children: [
        {
            id: 'pt-abrisam',
            name: 'PT Abrisam Bintan Indonesia',
            type: 'folder',
            children: [
                {
                    id: 'intern-log',
                    name: 'Internship Log.txt',
                    type: 'file',
                    content: 'No content yet.',
                    metadata: { fileType: 'text' }
                }
            ]
        }
    ]
};
