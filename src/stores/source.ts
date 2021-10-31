import type { SourceState } from './types';
import { writable } from 'svelte/store';
import { epochRgex } from './constants';

function createSourceState() {
	const { subscribe, set } = writable<SourceState>({ status: 'loading' });

	return {
		readUrl: async () => {
			// FIXME remove articifial delay
			await new Promise((res) => setTimeout(res, 1000));

			if (chrome.tabs) {
				const tabs = await chrome.tabs.query({
					active: true,
					lastFocusedWindow: true
				});
				sourceState.setSourceUrl(tabs[0].url);
			} else {
				sourceState.setSourceUrl(window.location.href);
			}
		},

		subscribe,

		setSourceUrl: (sourceUrl) => {
			const match = sourceUrl.match(epochRgex);
			if (match && match.length >= 5) {
				set({ status: 'success', data: { sourceUrl } });
			} else {
				set({ status: 'unsupported_url' });
			}
		}
	};
}

export const sourceState = createSourceState();
