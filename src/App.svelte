<script lang="ts">
	import { appState } from './stores/app';
	import DateRangeForm from './lib/DateRangeForm.svelte';
	import Loading from './lib/Loading.svelte';
	import Error from './lib/Error.svelte';
	import Result from './lib/Result.svelte';

	const appLoading = appState.load();
</script>

<main class="w-100 mx-auto px-2 py-2 relative">
	{#await appLoading}
		<Loading />
	{:then}
		<DateRangeForm />
		<Result />
	{:catch error}
		<Error {error} />
	{/await}
	<div class="absolute left-0 bottom-0 text-xs italic ml-2 mb-2">Released on 2021-11-14 ❤️</div>
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	html {
		font-size: 12px;
	}
</style>
