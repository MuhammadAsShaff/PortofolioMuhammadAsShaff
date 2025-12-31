import type { FileSystemItem } from '../types';

export const certificatesData: FileSystemItem = {
    id: 'certificates',
    name: 'Course Certificates',
    type: 'folder',
    children: [
        {
            id: 'cert-1',
            name: 'Certificate Placeholder.png',
            type: 'file',
            content: 'placeholder',
            metadata: { fileType: 'image' }
        }
    ]
};
