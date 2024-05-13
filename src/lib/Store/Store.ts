import { updated } from '$app/stores';
import { writable, type Writable } from 'svelte/store';

interface AllRecipesType {
	objectId: object;
	id:number;
	title: string;
	ingredients: string[];
	instructions: string;
}

export const GlobleStore: Writable<AllRecipesType[]> = writable([]);
