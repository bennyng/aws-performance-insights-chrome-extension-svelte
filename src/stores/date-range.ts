import { get, writable } from 'svelte/store';
import type { DateRange } from './types';
import { DateTime } from 'luxon';
import { dateFormat } from './constants';

export const utcOffset = writable<number>(defaultUtcOffset());
export const dateRange = writable<DateRange>(oneHour(defaultUtcOffset()));

export const useOneHour = (): void => dateRange.set(oneHour(get(utcOffset)));
export const useThreeHour = (): void => dateRange.set(threeHour(get(utcOffset)));

function defaultUtcOffset(): number {
	return DateTime.now().offset / 60; //london=1, hk=8
}

function oneHour(utcOffset: number): DateRange {
	return ago(1 * 60 * 60 * 1000, utcOffset);
}

function threeHour(utcOffset: number): DateRange {
	return ago(3 * 60 * 60 * 1000, utcOffset);
}

function ago(agoMs: number, utcOffset: number): DateRange {
	const now = DateTime.fromISO(DateTime.utc().toISO(), { zone: `utc+${utcOffset}` });
	const end = now;
	const start = end.minus(agoMs);

	const startTime = start.toFormat(dateFormat);
	const endTime = end.toFormat(dateFormat);

	return {
		startTime,
		endTime
	};
}
