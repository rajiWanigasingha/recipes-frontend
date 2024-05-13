<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { GlobleStore } from '$lib/Store/Store';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	function getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let id: number[] = [];

	GlobleStore.subscribe((values) => {
		values.map((value) => {
			id.push(value.id);
		});
	});

	const length = id.length;

	const link = id[getRandomInt(0, length - 1)];

	let loggin = false;

	if ($page.data.session) {
		const expire = new Date($page.data.session.expires);
		if (expire > new Date()) {
			loggin = true;
		}
	}

	function rediractToHome(){
		goto("/")
	}
</script>

<div class="mb-5 flex w-full flex-row items-center justify-between bg-orange-700 p-4 px-16">
	<div>
		<a href="/"><h1 class="scroll-m-20 text-xl font-semibold tracking-tight">Quick Recipes</h1></a>
	</div>
	<div class="flex flex-row items-center justify-between gap-3">
		<Button class="bg-yellow-600 font-semibold hover:bg-yellow-700" href={`/recipe/${link}`}
			>Get A Random Recipe</Button
		>
		{#if !loggin}
			<Button
				class="bg-green-600 font-semibold hover:bg-green-700"
				on:click={() => signIn('google')}>Login with Google</Button
			>
		{:else}
			<Button class="font-semibold" href={`/myrecipes/${$page.data.session?.user?.email}`}>My profile</Button>
			<Button class="font-semibold bg-red-900 hover:bg-red-950" on:click={() => {
				signOut()
				rediractToHome()
			}}>Logout</Button>
		{/if}
	</div>
</div>
