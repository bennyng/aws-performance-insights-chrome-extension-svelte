import { derived } from 'svelte/store';
import { DateTime } from 'luxon';
import type { ResultState } from './types';
import { dateRange, utcOffset } from './date-range';
import { sourceState } from './source';
import { dateFormat, epochRgex } from './constants';

export const resultState = derived(
	[sourceState, dateRange, utcOffset],
	([$sourceState, $dateRange, $utcOffset]): ResultState => {
		if (!$sourceState || $sourceState.status === 'loading') {
			return { status: 'loading' };
		}

		if ($sourceState.status === 'unsupported_url') {
			return { status: 'error', error: 'unsupported_url' };
		}

		const match = $sourceState.data.sourceUrl.match(epochRgex);

		const format = dateFormat;
		const options = {
			zone: `utc+${$utcOffset}`
		};
		const startEpoch = DateTime.fromFormat($dateRange.startTime, format, options).toMillis();
		const endEpoch = DateTime.fromFormat($dateRange.endTime, format, options).toMillis();

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

		return { status: 'error', error: 'Failed to generate' };
	}
);
