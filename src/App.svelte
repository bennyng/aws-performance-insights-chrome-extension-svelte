<script lang="ts">
	import { onMount } from 'svelte';
	import { sourceState } from './stores/source';
	import { resultState } from './stores/result';

	import DateRangeForm from './lib/DateRangeForm.svelte';
	import Loading from './lib/Loading.svelte';
	import UnsupportedURL from './lib/UnsupportedURL.svelte';

	import Result from './lib/Result.svelte';

	onMount(async () => {
		sourceState.readUrl();
	});
</script>

<main class="w-100 flex flex-col justify-center items-start mx-auto px-2 py-2">
	{#if $sourceState.status === 'loading'}
		<Loading />
	{:else if $sourceState.status === 'unsupported_url'}
		<UnsupportedURL />
	{:else}
		<DateRangeForm />
		<Result />
	{/if}
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	html {
		font-size: 12px;
	}
</style>
