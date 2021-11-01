<script lang="ts">
	import { appState } from '../stores/app';
	import Button from '../lib/components/Button.svelte';
</script>

<div class="h-20 flex flex-col justify-center items-center">
	{#if $appState.status === 'error'}
		<div class="text-md">{$appState.error}</div>

		<div class="mt-2">
			<Button
				on:click={() => {
					window.location.assign('http://localhost:5000/?startTime/1/endTime/2');
				}}>Debug URL</Button
			>
		</div>
	{/if}
</div>
