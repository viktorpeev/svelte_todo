import { writable } from 'svelte/store';

export const TodoStore = writable([{}], (set) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(data => set(data));
});
