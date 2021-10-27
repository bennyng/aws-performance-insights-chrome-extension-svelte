import { writable } from 'svelte/store';
import type { DateRange } from './types';
import { DateTime } from 'luxon';

export const dateRange = writable<DateRange>(oneHour());

export const useOneHour = (): void => dateRange.set(oneHour());
export const useThreeHour = (): void => dateRange.set(threeHour());

function oneHour(): DateRange {
	return ago(1 * 60 * 60 * 1000);
}

function threeHour(): DateRange {
	return ago(3 * 60 * 60 * 1000);
}

function ago(agoMs): DateRange {
	const format = 'yyyy-MM-dd HH:mm:ss';
	const utcOffset = 1;
	// const now = DateTime.fromISO(DateTime.now().toISO(), { zone: 'Europe/Paris' });
	const now = DateTime.fromISO(DateTime.utc().toISO(), { zone: `utc+${utcOffset}` });
	const end = now;
	const start = end.minus(agoMs);

	const startTime = start.toFormat(format);
	const endTime = end.toFormat(format);

	return {
		format,
		utcOffset,
		startTime,
		endTime
	};
}
