import { writable } from 'svelte/store';
import { readUrl } from './source';
import { init as initDateRange } from './date-range';
import type { AppState } from './types';

function createAppState() {
	const { subscribe, set } = writable<AppState>();

	return {
		subscribe,

		load: async () => {
			try {
				const { sourceUrl, startTime, endTime } = await readUrl();
				await initDateRange({ startTimeEpoch: +startTime, endTimeEpoch: +endTime });
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
