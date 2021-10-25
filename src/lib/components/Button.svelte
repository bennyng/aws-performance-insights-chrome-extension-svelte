<script lang="ts">
	export const label = 'button without label';
</script>

<!-- `on:click` is a shorthand, see https://svelte.dev/tutorial/dom-event-forwarding -->
<button class="bg-awesome focus:outline-none text-white py-2 px-4" on:click aria-label={label}>
	<slot>
		<em>one lonely button</em>
	</slot>
</button>
