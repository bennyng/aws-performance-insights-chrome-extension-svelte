<script lang="ts">
	import { dateRange, utcOffset, useHour, useDay } from '../stores/date-range';
	import TextField from './components/TextField.svelte';
	import Button from './components/Button.svelte';
	import History from './History.svelte';
</script>

<div class="px-0">
	<h3 class="text-lg font-medium leading-6 text-gray-900">Select date range</h3>
	<p class="text-sm text-gray-600">Your timezone is auto detected</p>
</div>

<div class="mt-2 md:mt-0">
	<div class="shadow overflow-hidden bg-white-md px-2 py-2">
		<div class="grid grid-cols-4 gap-2">
			<div class="col-span-2">
				<TextField bind:value={$utcOffset} id="utcOffset" label="Timezone (GMT)" />
			</div>
			<div class="col-span-4">
				<TextField bind:value={$dateRange.startTime} id="startTime" label="Start time" />
			</div>
			<div class="col-span-4">
				<TextField bind:value={$dateRange.endTime} id="endTime" label="End time" />
			</div>
		</div>

		<div class="flex justify-between items-center mt-2">
			<div>
				<Button small secondary on:click={() => useHour(1)}>1h</Button>
				<Button small secondary on:click={() => useHour(3)}>3h</Button>
				<Button small secondary on:click={() => useHour(6)}>6h</Button>
				<Button small secondary on:click={() => useHour(12)}>12h</Button>
			</div>
			<div>
				<Button small secondary on:click={() => useDay(1)}>1d</Button>
				<Button small secondary on:click={() => useDay(7)}>7d</Button>
			</div>
		</div>

		<History />
	</div>
</div>
