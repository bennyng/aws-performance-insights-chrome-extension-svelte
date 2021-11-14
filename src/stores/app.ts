import { writable } from 'svelte/store';

import { init as initDateRange } from './date-range';
import { init as initHistory } from './history';
import { readUrl } from './source';
import type { AppState } from './types';

function createAppState() {
	const { subscribe, set } = writable<AppState>();

	return {
		subscribe,

		load: async () => {
			try {
				const { sourceUrl, startTime, endTime } = await readUrl();

				await initDateRange({ startTimeEpoch: +startTime, endTimeEpoch: +endTime });
				await initHistory();

				const state: AppState = { status: 'loaded', data: { sourceUrl } };
				set(state);
				return state;
			} catch (error) {
				const state: AppState = { status: 'error', error };
				set(state);
				return Promise.reject(error);
			}
		}
	};
}

export const appState = createAppState();
