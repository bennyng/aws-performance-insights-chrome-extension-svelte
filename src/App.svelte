<script lang="ts">
	import { appState } from './stores/app';
	import DateRangeForm from './lib/DateRangeForm.svelte';
	import Loading from './lib/Loading.svelte';
	import Error from './lib/Error.svelte';
	import Result from './lib/Result.svelte';
	import Signature from './lib/components/Signature.svelte';

	const appLoading = appState.load();
</script>

<main class="w-100 mx-auto px-2 py-2 relative">
	{#await appLoading}
		<Loading />
	{:then}
		<DateRangeForm />
		<Result />
		<Signature />
	{:catch error}
		<Error {error} />
	{/await}
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	html {
		font-size: 12px;
	}
</style>
