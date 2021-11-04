import { epochRgex } from './constants';

export const readUrl = async (): Promise<{
	sourceUrl: string;
	startTime: string;
	endTime: string;
}> => {
	// FIXME remove articifial delay
	await new Promise((res) => setTimeout(res, 1000));

	let sourceUrl;

	if (chrome.tabs) {
		const tabs = await chrome.tabs.query({
			active: true,
			lastFocusedWindow: true
		});
		sourceUrl = tabs[0].url;
	} else {
		sourceUrl = window.location.href;
	}

	const match = sourceUrl.match(epochRgex);

	if (match && match.length >= 5) {
		const startTime = match[2];
		const endTime = match[3];
		return { sourceUrl, startTime, endTime };
	}

	return Promise.reject('Unsupported URL');
};
