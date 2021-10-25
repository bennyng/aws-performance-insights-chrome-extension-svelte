import { derived } from 'svelte/store';
import type { ResultState } from './types';
import { dateRange } from './date-range';
import { sourceState } from './source';
import { epochRgex } from './constants';

export const resultState = derived(
	[sourceState, dateRange],
	([$sourceState, $dateRange]): ResultState => {
		if (!$sourceState || $sourceState.status !== 'success') {
			return { status: 'loading' };
		}

		const match = $sourceState.data.sourceUrl.match(epochRgex);
		const startEpoch = Date.parse($dateRange.startTime);
		const endEpoch = Date.parse($dateRange.endTime);

		if (!isNaN(startEpoch) && !isNaN(endEpoch)) {
			if (match && match.length >= 5) {
				const head = match[1];
				// const epochStart = match[2];
				// const epochEnd = match[3];
				const tail = match[4];
				return {
					status: 'success',
					data: {
						resultUrl: `${head}startTime/${startEpoch}/endTime/${endEpoch}${tail}`
					}
				};
			}
		}
		return { status: 'error', error: 'ERROR!' };
	}
);
