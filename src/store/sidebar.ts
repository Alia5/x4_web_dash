import type { ComponentType } from 'svelte';
import { writable } from 'svelte/store';

const createSidebarContent = () => {
    const { subscribe, set } = writable<ComponentType | undefined>(undefined);
    return {
        subscribe,
        set,
        clear: () => set(undefined)
    };

};
export const sidebarContent = createSidebarContent();