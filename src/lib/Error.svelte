<script lang="ts">
	export let error = 'Error';
	import Button from '../lib/components/Button.svelte';
</script>

<div class="h-20 flex flex-col justify-center items-center">
	<div class="text-md">{error}</div>

	<div class="mt-2">
		<Button
			on:click={() => {
				window.location.assign('http://localhost:5000/?startTime/1/endTime/2');
			}}>Debug URL</Button
		>
	</div>
</div>
