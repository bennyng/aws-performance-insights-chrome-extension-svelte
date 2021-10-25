import { writable } from 'svelte/store';
import type { DateRange } from './types';

export const dateRange = writable<DateRange>(oneHour());
export const useOneHour = (): void => dateRange.set(oneHour());
export const useThreeHour = (): void => dateRange.set(threeHour());

function date2Str(datetime) {
	const date = datetime.toISOString().substring(0, 10);
	const time = datetime.toISOString().substring(11, 19);
	return `${date} ${time}`;
}

function oneHour(): DateRange {
	const end = new Date();
	const start = new Date(end.getTime() - 60 * 60 * 1000);

	const startTime = date2Str(start);
	const endTime = date2Str(end);

	return {
		startTime,
		endTime
	};
}

function threeHour(): DateRange {
	const end = new Date();
	const start = new Date(end.getTime() - 3 * 60 * 60 * 1000);

	const startTime = date2Str(start);
	const endTime = date2Str(end);

	return {
		startTime,
		endTime
	};
}
