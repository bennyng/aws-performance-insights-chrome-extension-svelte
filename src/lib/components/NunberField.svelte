<script lang="ts">
	export let label: string;
	export let value: string;
	export let id: string;
</script>

{#if label}
	<label class="block text-gray-700 text-sm font-bold mb-2" for={id}> {label} </label>
{/if}

<input
	bind:value
	on:input
	class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
	{id}
	type="number"
	{label}
/>
