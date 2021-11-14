import { DateTime } from 'luxon';
import {
	get,
	writable
} from 'svelte/store';

import { dateFormat } from './constants';
import type { DateRange } from './types';

export const utcOffset = writable<number>();

export const dateRange = writable<DateRange>();

export const useHour = (hour: number): void =>
	dateRange.set(ago(hour * 60 * 60 * 1000, get(utcOffset)));

export const useDay = (day: number): void => useHour(day * 24);

export const init = async ({ startTimeEpoch, endTimeEpoch }) => {
	const items = await readStore();
	const utcOffsetValue = items['utcOffset'] || defaultUtcOffset();

	utcOffset.set(utcOffsetValue);

	const options = { zone: `utc+${utcOffsetValue}` };
	const startTime = DateTime.fromMillis(startTimeEpoch, options).toFormat(dateFormat);
	const endTime = DateTime.fromMillis(endTimeEpoch, options).toFormat(dateFormat);
	dateRange.set({ startTime, endTime });
};

utcOffset.subscribe(() => writeStore());

function defaultUtcOffset(): number {
	return DateTime.now().offset / 60; //london=1, hk=8
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

function readStore(): Promise<any> {
	return new Promise((resolve, reject) => {
		if (chrome.storage) {
			try {
				chrome.storage.sync.get(['utcOffset'], resolve);
			} catch (error) {
				reject(error);
			}
		} else {
			resolve({});
		}
	});
}

function writeStore() {
	if (chrome.storage) {
		chrome.storage.sync.set({ utcOffset: get(utcOffset) });
	}
}
