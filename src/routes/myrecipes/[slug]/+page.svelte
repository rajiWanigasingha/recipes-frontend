<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import placeholder from '$lib/images/placeholder.png';
	import Terminal from 'lucide-svelte/icons/terminal';
	import * as Alert from '$lib/components/ui/alert/index.js';

	interface favorite {
		title: string;
		id: string;
	}

	export let data;

	const Favorite = data.favorite as favorite[];
</script>

<div class="flex w-full flex-wrap justify-center gap-3 px-16">
	{#if Favorite.length === 0}
		<div class="w-full mt-20">
			<Alert.Root>
				<Terminal class="h-4 w-4" />
				<Alert.Title class="text-lg font-semibold">Oh no!</Alert.Title>
				<Alert.Description class="flex flex-col gap-2">
					<h1 class="text-base text-muted-foreground">You have not add any favorites yet.</h1>
					<Button class="bg-green-600 hover:bg-green-700" href="/">Go back to home page and a a favorite</Button>
				</Alert.Description>
			</Alert.Root>
		</div>
	{:else}
		{#each Favorite as myrecipes}
			<Card class="w-[300px] bg-teal-800">
				<CardHeader>
					<CardTitle class="text-center text-xl">{myrecipes.title}</CardTitle>
				</CardHeader>
				<CardContent class="flex flex-row justify-center">
					<img src={placeholder} alt="Images" width="200" height="200" />
				</CardContent>
				<CardFooter class="flex flex-row justify-end gap-4">
					<Button
						class="bg-blue-600 font-semibold hover:bg-blue-700"
						href={`/recipe/${myrecipes.id}`}>Check it out</Button
					>
				</CardFooter>
			</Card>
		{/each}
	{/if}
</div>
