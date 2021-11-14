<script>
	import Button from './components/Button.svelte';
	import { sorted, open, remove } from '../stores/history';
</script>

<div class="mt-6 mx-1">
	{#if $sorted.length <= 0}
		<div class="text-xs text-center font-bold">-- No recent history --</div>
	{:else}
		<div class="text-xs font-bold">Recent {$sorted.length} history</div>
		<div class="max-h-20 overflow-scroll border-solid border-2 border-awesome-700">
			{#each $sorted as { uuid, startTime, endTime }, i}
				<div class="flex justify-between items-center cursor-pointer" on:click={() => open(uuid)}>
					<div class="text-xs">{startTime} - {endTime}</div>
					<div>
						<Button small clear stopPropagation on:click={() => open(uuid)}>👌</Button>
						<Button small clear stopPropagation on:click={() => remove(uuid)}>❌</Button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
