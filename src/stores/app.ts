import { writable } from 'svelte/store';
import { readUrl } from './source';
import { init as initDateRange } from './date-range';
import type { AppState } from './types';

function createAppState() {
	const { subscribe, set } = writable<AppState>();

	return {
		subscribe,

		load: async () => {
			await initDateRange();

			try {
				const sourceUrl = await readUrl();
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
