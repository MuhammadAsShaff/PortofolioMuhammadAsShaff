
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
