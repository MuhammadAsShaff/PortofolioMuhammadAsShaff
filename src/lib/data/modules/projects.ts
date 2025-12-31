import type { FileSystemItem } from '../types';

export const projectsData: FileSystemItem = {
    id: 'projects',
    name: 'Projects',
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
};
