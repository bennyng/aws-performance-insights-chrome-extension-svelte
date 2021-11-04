if (document.readyState !== 'complete') {
	window.addEventListener('load', offAutoRefreshWithRetries);
} else {
	offAutoRefreshWithRetries();
}

let turnedOff = false;

function offAutoRefresh() {
	if (turnedOff) {
		return;
	}
	const toggleButton = document.getElementById('awsui-toggle-0');
	if (toggleButton && toggleButton.checked) {
		toggleButton.click();
		turnedOff = true;
	}
}

function offAutoRefreshWithRetries() {
	setTimeout(offAutoRefresh, 0);
	setTimeout(offAutoRefresh, 200);
	setTimeout(offAutoRefresh, 500);
	setTimeout(offAutoRefresh, 1000);
}
