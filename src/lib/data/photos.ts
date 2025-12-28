
export interface Photo {
    id: string;
    src: string;
    alt: string;
}

export const photos: Photo[] = [
    { id: '1', src: 'https://placehold.co/400x300?text=Photo+1', alt: 'Photo 1' },
    { id: '2', src: 'https://placehold.co/400x500?text=Photo+2', alt: 'Photo 2' },
    { id: '3', src: 'https://placehold.co/400x400?text=Photo+3', alt: 'Photo 3' },
    { id: '4', src: 'https://placehold.co/500x400?text=Photo+4', alt: 'Photo 4' },
    { id: '5', src: 'https://placehold.co/300x400?text=Photo+5', alt: 'Photo 5' },
    { id: '6', src: 'https://placehold.co/400x300?text=Photo+6', alt: 'Photo 6' },
];
