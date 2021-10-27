<script lang="ts">
	import { sourceState } from './stores/source';

	import PresetButtons from './lib/PresetButtons.svelte';
	import DateRangeForm from './lib/DateRangeForm.svelte';
	import Source from './lib/Source.svelte';
	import Result from './lib/Result.svelte';
</script>

<main class="px-2 py-2">
	<Source />

	{#if $sourceState.status === 'loading'}
		<h1>Loading ...</h1>
	{/if}

	{#if $sourceState.status === 'error'}
		<h1>Unsuppprted URL</h1>
	{/if}

	{#if $sourceState.status === 'success'}
		<DateRangeForm />

		<PresetButtons />

		<Result />
	{/if}
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
