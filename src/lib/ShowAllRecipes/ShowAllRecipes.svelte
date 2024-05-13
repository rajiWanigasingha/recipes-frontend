<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import placeholder from '$lib/images/placeholder.png';
	import { GlobleStore } from '$lib/Store/Store';
	import { onDestroy } from 'svelte';
	import Swal from 'sweetalert2';
	import { page } from '$app/stores';

	interface AllRecipesType {
		objectId: object;
		id: number;
		title: string;
		ingredients: string[];
		instructions: string;
	}

	let data: AllRecipesType[] = [];

	const storeSub = GlobleStore.subscribe((values) => {
		data.push(...values);
	});

	onDestroy(storeSub);

	let idValue;
	let inputFild: HTMLInputElement;

	async function addToFavorite(event: Event, id: number) {
		if (!$page.data.session) {
			Swal.fire({
				title: 'Oh On!',
				text: 'You have to loggin',
				icon: 'warning'
			});
			return false;
		}

		const formElement = event.target as HTMLFormElement;
		const formData = new FormData(formElement);

		formData.append('id', id.toString());
		
		if ($page.data.session.user && $page.data.session.user.email) {
			formData.append('email', $page.data.session.user?.email?.toString());
		}

		const res = await fetch(formElement.action, {
			method: 'POST',
			body: formData
		});

		const data = await res.json();

		if (data) {
			const respose = JSON.parse(JSON.parse(data.data));

			console.log(respose);
			const id = respose.data.id;

			if (id) {
				Swal.fire({
					title: 'Success',
					text: 'This recipe added to your favorite',
					icon: 'success'
				});
			} else {
				Swal.fire({
					title: 'Error',
					text: 'Somthing went wrong',
					icon: 'error'
				});
			}
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Somthing went wrong',
				icon: 'error'
			});
		}
	}
</script>

<div class="mt-10 flex flex-wrap justify-center gap-5 px-16">
	{#each data as valueOfData}
		<Card class="w-[300px] bg-teal-800">
			<CardHeader>
				<CardTitle class="text-center text-xl">{valueOfData.title}</CardTitle>
			</CardHeader>
			<CardContent class="flex flex-row justify-center">
				<img src={placeholder} alt="Images" width="200" height="200" />
			</CardContent>
			<CardFooter class="flex flex-row justify-end gap-4">
				<form
					method="post"
					on:submit|preventDefault={(event) => addToFavorite(event, valueOfData.id)}
				>
					<input type="text" hidden />
					<Button type="submit" class="bg-purple-600 font-semibold hover:bg-purple-700"
						>Favirote</Button
					>
				</form>
				<Button
					class="bg-blue-600 font-semibold hover:bg-blue-700"
					href={`/recipe/${valueOfData.id}`}>Check it out</Button
				>
			</CardFooter>
		</Card>
	{/each}
</div>
