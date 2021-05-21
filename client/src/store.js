import { writable } from 'svelte/store';

export const metadata = writable({
    title: '',
    duration: 0,
    position: 0
});