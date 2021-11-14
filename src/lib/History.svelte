<script>
	import Button from './components/Button.svelte';
	import { sorted, open, remove } from '../stores/history';
</script>

<div class="text-xs font-bold">Recent history ({$sorted.length})</div>
{#if $sorted.length <= 0}
	<div class="text-xs text-center py-2">Nothing yet.</div>
{:else}
	<div class="max-h-20 overflow-scroll bg-gray-100">
		{#each $sorted as { uuid, startTime, endTime }, i}
			<div class="flex justify-between items-center">
				<div on:click={() => open(uuid)} class="text-xs cursor-pointer">
					{startTime} - {endTime}
				</div>
				<div>
					<Button small clear on:click={() => remove(uuid)}>❌</Button>
				</div>
			</div>
		{/each}
	</div>
{/if}
