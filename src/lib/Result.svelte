<script lang="ts">
	import { resultState } from '../stores/result';
	import Button from '../lib/components/Button.svelte';

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
</script>

<h3>Result URL</h3>

{#if $resultState.status === 'success'}
	<h3>{$resultState.data.resultUrl}</h3>
{/if}

{#if $resultState.status === 'loading'}
	<h3>Loading</h3>
{/if}

{#if $resultState.status === 'error'}
	<h3>{$resultState.error}</h3>
{/if}

<Button on:click={submit}>Submit</Button>
