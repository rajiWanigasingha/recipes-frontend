<script lang="ts">
	import Navbar from '$lib/Navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import '../app.css';
	import { GlobleStore } from '$lib/Store/Store';

	interface AllRecipesType {
		objectId: object;
		id:number;
		title: string;
		ingredients: string[];
		instructions: string;
	}

	const data = $page.data.recipes as AllRecipesType[];

	if (data) {
		GlobleStore.update((state) => {
			return [...state, ...data];
		});
	}
</script>

<div class="min-h-screen w-full bg-slate-900">
	<Navbar></Navbar>
	<slot></slot>
</div>
