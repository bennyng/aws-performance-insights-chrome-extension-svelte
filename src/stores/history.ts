import { DateTime } from 'luxon';
import {
	derived,
	get,
	writable
} from 'svelte/store';
import { v4 as uuid } from 'uuid';

import {
	dateRange,
	utcOffset
} from './date-range';
import type { HistoryRecord } from './types';

export const records = writable<HistoryRecord[]>([]);

export const sorted = derived(records, (items) =>
	[...items].sort((a, b) => b.createTime - a.createTime)
);

export const init = async () => {
	const store = await readStore();
	const storeRecords = store['history'] || [];
	console.log('storeRecordsstoreRecords', storeRecords);
	records.set(storeRecords);
};

export const add = (utcOffset: number, startTime: string, endTime: string) => {
	if (
		get(records).find(
			(r) => r.utcOffset === utcOffset && r.startTime === startTime && r.endTime === endTime
		)
	) {
		return;
	}

	records.set([
		...get(records),
		{
			utcOffset,
			startTime,
			endTime,
			uuid: uuid(),
			createTime: DateTime.now().toMillis()
		}
	]);
	writeStore();
};

export const remove = (uuid: string) => {
	records.set([...get(records).filter((v) => v.uuid !== uuid)]);
	writeStore();
};

export const open = (uuid: string) => {
	const record = get(records).find((r) => r.uuid === uuid);
	if (record) {
		utcOffset.set(record.utcOffset);
		dateRange.set({ startTime: record.startTime, endTime: record.endTime });
	}
};

function readStore(): Promise<any> {
	return new Promise((resolve, reject) => {
		if (chrome.storage) {
			try {
				chrome.storage.sync.get(['history'], resolve);
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
		chrome.storage.sync.set({ history: get(records) });
	}
}
