if (document.readyState !== 'complete') {
	window.addEventListener('load', offAutoRefreshWithRetries);
} else {
	offAutoRefreshWithRetries();
}

let found = false;

function offAutoRefresh() {
	if (found) {
		return;
	}
	const toggleButton = document.getElementById('awsui-toggle-0');
	if (toggleButton) {
		found = true;
		if (toggleButton.checked) {
			toggleButton.click();
		}
	}
}

function offAutoRefreshWithRetries() {
	setTimeout(offAutoRefresh, 0);
	setTimeout(offAutoRefresh, 200);
	setTimeout(offAutoRefresh, 500);
	setTimeout(offAutoRefresh, 1000);
	setTimeout(offAutoRefresh, 3000);
	setTimeout(offAutoRefresh, 5000);
	setTimeout(offAutoRefresh, 8000);
	setTimeout(offAutoRefresh, 10000);
}
