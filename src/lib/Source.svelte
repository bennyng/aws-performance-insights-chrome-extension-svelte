<script lang="ts">
	import { sourceState } from '../stores/source';
	import { onMount } from 'svelte';
	import TextField from '../lib/components/TextField.svelte';
	import Button from '../lib/components/Button.svelte';

	const sampleUrl = 'http://localhost:5000/?startTime/1/endTime/2';

	onMount(async () => {
		// FIXME remove articifial delay
		await new Promise((res) => setTimeout(res, 1000));

		if (chrome.tabs) {
			const tabs = await chrome.tabs.query({
				active: true,
				lastFocusedWindow: true
			});
			sourceState.setSourceUrl(tabs[0].url);
		} else {
			sourceState.setSourceUrl(window.location.href);
		}
	});

	function handleInput(e) {
		sourceState.setSourceUrl((e.target as any).value);
	}
</script>

{#if $sourceState.status === 'success'}
	<TextField
		on:input={handleInput}
		value={$sourceState.data.sourceUrl}
		id="sourceUrl"
		label="Source URL"
	/>
{/if}

<Button on:click={() => sourceState.setSourceUrl(sampleUrl)}>Sample</Button>
