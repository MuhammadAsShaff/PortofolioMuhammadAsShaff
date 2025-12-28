
export interface BlogPost {
    id: string;
    title: string;
    date: string;
    description: string;
    slug: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'How I Built My macOS-Style Dev Portfolio',
        date: 'Sep 2, 2025',
        description: 'A deep dive into SvelteKit, Tailwind, and the magic of component design.',
        slug: 'macos-portfolio'
    },
    {
        id: '2',
        title: 'Organizing Projects for Sanity and Speed',
        date: 'Aug 28, 2025',
        description: 'Tips on file structure, git workflows, and maintaining mental clarity.',
        slug: 'organizing-projects'
    },
    {
        id: '3',
        title: 'Small UX Details That Make a Big Difference',
        date: 'Aug 15, 2025',
        description: 'Why micro-interactions and smooth states matter more than you think.',
        slug: 'ux-details'
    }
];
