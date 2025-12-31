import type { FileSystemItem } from '../types';

export const organizationsData: FileSystemItem = {
    id: 'organizations',
    name: 'Organization Experience',
    type: 'folder',
    children: [
        {
            id: 'org-1',
            name: 'Organization.txt',
            type: 'file',
            content: 'Details about organization experience.',
            metadata: { fileType: 'text' }
        }
    ]
};
