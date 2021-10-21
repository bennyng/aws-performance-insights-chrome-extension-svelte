let changeColor = document.getElementById("changeColor");

let startInput = document.getElementById("startTime");
let endInput = document.getElementById("endTime");

const end = new Date();
const endDate = end.toISOString().substring(0, 10);
const endTime = end.toISOString().substring(11, 19);
endInput.value = `${endDate} ${endTime}`;

const start = new Date(end - 60 * 60 * 1000);
const startDate = start.toISOString().substring(0, 10);
const startTime = start.toISOString().substring(11, 19);
startInput.value = `${startDate} ${startTime}`;

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const startEpoch = Date.parse(startInput.value);
  const endEpoch = Date.parse(endInput.value);

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    // url =
    //   "https://example.com/startTime/1634379579180/endTime/1634465979180/tail";

    const epochRgex = /(.*)startTime\/([0-9]+)\/endTime\/([0-9]+)(.*)/;
    const match = url.match(epochRgex);

    if (match && match.length >= 5) {
      const head = match[1];
      // const epochStart = match[2];
      // const epochEnd = match[3];
      const tail = match[4];
      const newUrl = `${head}startTime/${startEpoch}/endTime/${endEpoch}${tail}`;

      chrome.tabs.update(tab.id, { url: newUrl });
      // chrome.tabs.reload(tab.id), { bypassCache: true };

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: changeLocation,
        args: [newUrl],
      });
    } else {
      alert("unsupported URL \\o/");
    }
  });
});

function changeLocation(newLocation) {
  window.location.href = newLocation;
  window.location.reload();
}
