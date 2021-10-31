<script lang="ts">
	import { resultState } from '../stores/result';
	import Button from '../lib/components/Button.svelte';

	$: submitDisabled = $resultState.status !== 'success';

	async function submit() {
		if (!$resultState || $resultState.status !== 'success') {
			throw new Error('Invalid result URL');
		}

		const resultUrl = $resultState.data.resultUrl;

		if (!chrome.tabs) {
			window.location.assign(resultUrl);
			return;
		}

		let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		await chrome.tabs.update(tab.id, { url: resultUrl });
		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: () => {
				window.location.assign(resultUrl);
			}
		});
	}

	async function copyToClipboard() {
		if ($resultState.status === 'success') {
			// $resultState.data.resultUrl
		}
	}
</script>

<div class="px-0 mt-4">
	<h5 class="text-md font-medium leading-6 text-gray-900">Result URL</h5>
</div>

<div class="w-full flex flex-col justify-center items-start">
	{#if $resultState.status === 'success'}
		<div class="w-full shadow break-all text-sm bg-white-md px-2 py-2 sm:p-4">
			{$resultState.data.resultUrl}
		</div>

		<div class="w-full flex flex-row justify-between mt-4">
			<Button disabled={submitDisabled} on:click={submit}>Open</Button>
			<Button disabled={submitDisabled} on:click={copyToClipboard}>Copy</Button>
		</div>
	{:else if $resultState.status === 'error'}
		<h3>{$resultState.error}</h3>
	{/if}
</div>
