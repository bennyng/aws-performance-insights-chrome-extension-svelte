<script lang="ts">
	import { dateRange, utcOffset, useOneHour, useThreeHour } from '../stores/date-range';
	import TextField from './components/TextField.svelte';
	import Button from './components/Button.svelte';
</script>

<div class="px-0">
	<h3 class="text-lg font-medium leading-6 text-gray-900">Select date range</h3>
	<p class="mt-1 text-sm text-gray-600">Your timezone is auto detected</p>
</div>

<div class="mt-2 md:mt-0">
	<div class="shadow overflow-hidden bg-white-md px-2 py-2 sm:p-4">
		<div class="grid grid-cols-2 gap-3">
			<div class="col-span-1">
				<TextField bind:value={$utcOffset} id="utcOffset" label="GMT+" />
			</div>
			<div class="col-span-2">
				<TextField bind:value={$dateRange.startTime} id="startTime" label="Start time" />
			</div>
			<div class="col-span-2">
				<TextField bind:value={$dateRange.endTime} id="endTime" label="End time" />
			</div>
			<div class="col-span-2">
				<Button on:click={useOneHour}>1h</Button>
				<Button on:click={useThreeHour}>3h</Button>
			</div>
		</div>
	</div>
</div>
