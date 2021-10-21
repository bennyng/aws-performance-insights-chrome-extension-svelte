<script>
  import { onMount } from "svelte";

  const end = new Date();
  const start = new Date(end - 60 * 60 * 1000);

  let startTime = date2Str(start);
  let endTime = date2Str(end);
  let originalUrl;
  let tabId;
  let newUrl;

  const epochRgex = /(.*)startTime\/([0-9]+)\/endTime\/([0-9]+)(.*)/;

  $: if (originalUrl) {
    const match = originalUrl.match(epochRgex);
    const startEpoch = Date.parse(startTime);
    const endEpoch = Date.parse(endTime);

    if (!isNaN(startEpoch) && !isNaN(endEpoch)) {
      if (match && match.length >= 5) {
        const head = match[1];
        // const epochStart = match[2];
        // const epochEnd = match[3];
        const tail = match[4];
        newUrl = `${head}startTime/${startEpoch}/endTime/${endEpoch}${tail}`;
      } else {
        newUrl = "invalid";
      }
    } else {
      newUrl = "invalid";
    }
  }

  onMount(async () => {
    // const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
    // photos = await res.json();
    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    originalUrl = tabs[0].url;
    tabId = tabs[0].id;
  });

  async function submit() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await chrome.tabs.update(tab.id, { url: newUrl });
    // chrome.tabs.reload(tab.id), { bypassCache: true };

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        window.location.replace(newUrl);
        window.location.reload();
      },
    });
  }

  function date2Str(datetime) {
    const date = datetime.toISOString().substring(0, 10);
    const time = datetime.toISOString().substring(11, 19);
    return `${date} ${time}`;
  }
</script>

<div>Start time</div>
<input bind:value={startTime} />

<div>End time</div>
<input bind:value={endTime} />

<button on:click={submit}>Submit</button>

<div>{startTime}</div>
<div>{originalUrl}</div>
<div>{newUrl}</div>

<style>
</style>
