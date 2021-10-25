<script lang="ts">
	import { dateRange } from '../stores/date-range';
	import TextField from './components/TextField.svelte';
</script>

<form class="bg-white shadow-md rounded px-4 pt-6 pb-2">
	<div class="mb-4">
		<TextField bind:value={$dateRange.startTime} id="startTime" label="Start time" />
	</div>
	<div class="mb-6">
		<TextField bind:value={$dateRange.endTime} id="endTime" label="End time" />
	</div>
</form>
