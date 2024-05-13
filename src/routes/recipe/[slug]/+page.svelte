<script lang="ts">
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
    import { page } from '$app/stores';
	import { GlobleStore } from '$lib/Store/Store';
	import { onDestroy } from 'svelte';

	interface AllRecipesType {
		objectId: object;
		id: number;
		title: string;
		ingredients: string[];
		instructions: string;
	}

	let dataRecipes: AllRecipesType[] = [];

	const storeSub = GlobleStore.subscribe((values) => {
		dataRecipes.push(...values);
	});

	onDestroy(storeSub);

	export let data;

	let recipe: AllRecipesType[] = [];

	dataRecipes.map((values) => {
		console.log(values.id, data.id);
		if (values.id === Number(data.id)) {
			recipe.push(values);
		}
	});
</script>

<div class="mt-10 px-16 pb-10">
	<Card>
		<CardHeader>
			<CardTitle class="text-xl text-center">{recipe[0].title}</CardTitle>
		</CardHeader>
		<CardContent>
			<CardDescription class="text-lg">Recipe Ingredients</CardDescription>
            {#each recipe[0].ingredients as ingredients}
                <p class="p-2 text-sm font-semibold pl-4">{ingredients}</p>
            {/each}
			<CardDescription class="text-lg">How to make</CardDescription>
            <p class="leading-7 text-sm p-2 font-semibold pl-4">{recipe[0].instructions}</p>
		</CardContent>
	</Card>
</div>
