
import { writable } from 'svelte/store';

export interface WindowState {
    id: string;
    title: string;
    type: 'finder' | 'text' | 'resume' | 'safari' | 'photos' | 'about' | 'contact' | 'terminal';
    data?: any;
    minimized: boolean;
    zIndex: number;
    position: { x: number; y: number };
}

function createWindowStore() {
    const { subscribe, update } = writable<WindowState[]>([]);
    let maxZIndex = 100;

    return {
        subscribe,
        openWindow: (window: Omit<WindowState, 'zIndex' | 'minimized' | 'position'>) => update(windows => {
            const existing = windows.find(w => w.id === window.id);
            if (existing) {
                maxZIndex++;
                return windows.map(w => w.id === window.id ? { ...w, minimized: false, zIndex: maxZIndex } : w);
            }
            maxZIndex++;
            const x = 50 + (windows.length * 30);
            const y = 50 + (windows.length * 30);
            return [...windows, { ...window, zIndex: maxZIndex, minimized: false, position: { x, y } }];
        }),
        closeWindow: (id: string) => update(windows => windows.filter(w => w.id !== id)),
        minimizeWindow: (id: string) => update(windows => windows.map(w => w.id === id ? { ...w, minimized: true } : w)),
        focusWindow: (id: string) => update(windows => {
            maxZIndex++;
            return windows.map(w => w.id === id ? { ...w, zIndex: maxZIndex } : w);
        }),
        updatePosition: (id: string, x: number, y: number) => update(windows => 
            windows.map(w => w.id === id ? { ...w, position: { x, y } } : w)
        )
    };
}

export const windowStore = createWindowStore();
