
import { writable } from 'svelte/store';

export type MobilePage = 'home' | 'work' | 'work-detail' | 'photos' | 'safari' | 'contact' | 'tech' | 'about';

interface MobileState {
    page: MobilePage;
    data?: any; 
    history: MobilePage[];
}

function createMobileNav() {
    const { subscribe, update, set } = writable<MobileState>({ page: 'home', history: [] });

    return {
        subscribe,
        goTo: (page: MobilePage, data?: any) => update(s => ({ 
            page, 
            data, 
            history: [...s.history, s.page] 
        })),
        goBack: () => update(s => {
            if (s.history.length === 0) return s;
            const newHistory = [...s.history];
            const prev = newHistory.pop();
            return { page: prev || 'home', history: newHistory, data: undefined };
        }),
        reset: () => set({ page: 'home', history: [] })
    };
}

export const mobileNav = createMobileNav();
