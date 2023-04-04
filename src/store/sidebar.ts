import { writable } from 'svelte/store';

const createSidebarContent = () => {
    const { subscribe, set } = writable<any | undefined>(undefined);
    return {
        subscribe,
        set,
        clear: () => set(undefined)
    };

};
export const sidebarContent = createSidebarContent();