import { DateTime } from 'luxon';
import {
	derived,
	get
} from 'svelte/store';

import { appState } from './app';
import {
	dateFormat,
	epochRgex
} from './constants';
import {
	dateRange,
	utcOffset
} from './date-range';
import { add as addHistory } from './history';
import type { ResultState } from './types';

export const resultState = derived(
	[appState, dateRange, utcOffset],
	([$appState, $dateRange, $utcOffset]): ResultState => {
		if (!$appState || $appState.status === 'loading') {
			return { status: 'loading' };
		}

		if ($appState.status === 'error') {
			return { status: 'error', error: $appState.error };
		}

		const match = $appState.data.sourceUrl.match(epochRgex);

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

export const submit = async () => {
	const state = get(resultState);
	if (!state || state.status !== 'success') {
		throw new Error('Invalid result URL');
	}

	const resultUrl = state.data.resultUrl;

	if (!chrome.tabs) {
		addHistory(get(utcOffset), get(dateRange).startTime, get(dateRange).endTime);
		// window.location.assign(resultUrl);
		return;
	}

	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	await chrome.tabs.update(tab.id, { url: resultUrl });
	await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		args: [resultUrl],
		func: (url) => {
			window.location.href = url;
			window.location.reload();
			const toggleButton = document.getElementById('awsui-toggle-0');
			if ((toggleButton as any).checked) {
				toggleButton.click();
			}
		}
	});
	addHistory(get(utcOffset), get(dateRange).startTime, get(dateRange).endTime);
};
