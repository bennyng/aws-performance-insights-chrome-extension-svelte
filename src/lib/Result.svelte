<script lang="ts">
	import { resultState, submit } from '../stores/result';
	import Button from '../lib/components/Button.svelte';

	$: submitDisabled = $resultState.status !== 'success';
</script>

<div class="px-0 mt-4">
	<h5 class="text-md font-medium leading-6 text-gray-900">Result URL</h5>
</div>

<div class="w-full flex flex-col justify-center items-start">
	{#if $resultState.status === 'success'}
		<div class="w-full shadow break-all text-sm bg-white-md px-2 py-2 sm:p-4">
			{$resultState.data.resultUrl}
		</div>

		<div class="w-full flex flex-row justify-end mt-2">
			<Button disabled={submitDisabled} on:click={submit}>Open</Button>
		</div>
	{:else if $resultState.status === 'error'}
		<h3>{$resultState.error}</h3>
	{/if}
</div>
