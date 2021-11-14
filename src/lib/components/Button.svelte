<script lang="ts">
	export const label = 'button without label';
	export let disabled: boolean = false;
	export let small: boolean = false;
	export let clear: boolean = false;
	export let secondary: boolean = false;
</script>

<!-- `on:click` is a shorthand, see https://svelte.dev/tutorial/dom-event-forwarding -->
<button
	{disabled}
	class="bg-awesome focus:outline-none text-white py-2 px-4"
	class:small
	class:clear
	class:secondary
	on:click
	aria-label={label}
>
	<slot>
		<em>one lonely button</em>
	</slot>
</button>

<style lang="postcss">
	.small {
		@apply py-1 px-2 text-xs;
	}
	.clear {
		@apply bg-transparent;
	}
	.secondary {
		@apply bg-gray-800;
	}
</style>
