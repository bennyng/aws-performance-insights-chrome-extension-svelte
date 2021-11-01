import { get, writable } from 'svelte/store';
import type { DateRange } from './types';
import { DateTime } from 'luxon';
import { dateFormat } from './constants';

export const utcOffset = writable<number>(defaultUtcOffset());
export const dateRange = writable<DateRange>(oneHour(defaultUtcOffset()));

export const useHour = (hour: number): void =>
	dateRange.set(ago(hour * 60 * 60 * 1000, get(utcOffset)));

export const useDay = (day: number): void => useHour(day * 24);

function defaultUtcOffset(): number {
	return DateTime.now().offset / 60; //london=1, hk=8
}

function oneHour(utcOffset: number): DateRange {
	return ago(1 * 60 * 60 * 1000, utcOffset);
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
