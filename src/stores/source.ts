import type { SourceState } from './types';
import { writable } from 'svelte/store';
import { epochRgex } from './constants';

function createSourceState() {
	const { subscribe, set } = writable<SourceState>({ status: 'loading' });

	return {
		subscribe,
		setSourceUrl: (sourceUrl) => {
			const match = sourceUrl.match(epochRgex);
			if (match && match.length >= 5) {
				set({ status: 'success', data: { sourceUrl } });
			} else {
				set({ status: 'error', error: 'Unsupported URL' });
			}
		},
		error: (error) => set({ status: 'error', error })
	};
}

export const sourceState = createSourceState();
