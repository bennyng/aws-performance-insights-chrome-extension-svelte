import { epochRgex } from './constants';

export const readUrl = async (): Promise<string> => {
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
		return sourceUrl;
	}

	return Promise.reject('Unsupported URL');
};
