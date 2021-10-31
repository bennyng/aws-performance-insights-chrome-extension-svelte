<script lang="ts">
	import { sourceState } from '../stores/source';
	import Button from '../lib/components/Button.svelte';

	const debugUrl = 'http://localhost:5000/?startTime/1/endTime/2';
</script>

<div class="h-10 flex justify-center items-center">
	{#if $sourceState.status === 'unsupported_url'}
		<h3>Unsupported URL</h3>

		<div>
			<Button on:click={() => sourceState.setSourceUrl(debugUrl)}>Debug URL</Button>
		</div>
	{/if}
</div>
