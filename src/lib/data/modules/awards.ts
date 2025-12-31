import type { FileSystemItem } from '../types';

export const awardsData: FileSystemItem = {
    id: 'awards',
    name: 'Awards',
    type: 'folder',
    children: [
        {
            id: 'ward-1',
            name: 'Award Placeholder.png',
            type: 'file',
            content: 'placeholder',
            metadata: { fileType: 'image' }
        }
    ]
};
