<script lang="ts">
	import { useOneHour, useThreeHour } from '../stores/date-range';
	import Button from './components/Button.svelte';
</script>

<div class="bg-white shadow-md rounded px-4 pt-1 pb-1">
	<Button on:click={useOneHour}>1h</Button>
	<Button on:click={useThreeHour}>3h</Button>
</div>
