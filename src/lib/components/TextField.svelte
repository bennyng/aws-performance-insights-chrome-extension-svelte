<script lang="ts">
	export let label: string;
	export let value: string | number;
	export let id: string;
</script>

{#if label}
	<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
{/if}
<input
	bind:value
	on:input
	type="text"
	name={id}
	{id}
	autocomplete={id}
	class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
	{label}
/>
