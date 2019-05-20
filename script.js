function on_submit() {
	if(document.querySelector('input[type=search]').value !== '') {
		window.location.href = 'https://www.google.com/search?q='
			+ document.querySelector('input[type=search]').value.replace(' ', '+')
			+ '&oq=' + document.querySelector('input[type=search]').value.replace(' ', '+');
	}
}

function installApp() {
	// Show the prompt
	deferredPrompt.prompt();
	setupButton.disabled = true;
	// Wait for the user to respond to the prompt
	deferredPrompt.userChoice
		.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('PWA setup accepted');
				// hide our user interface that shows our A2HS button
				setupButton.style.display = 'none';
			} else {
				console.log('PWA setup rejected');
			}
			deferredPrompt = null;
		});
}

window.onload = () => {
	function get_hours() {
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		document.querySelector('.hours').innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 60 ? '0' + seconds : seconds}`;
	}

	get_hours();
	setInterval(get_hours, 1000);

	let deferredPrompt; // Allows to show the install prompt
	let setupButton;

	window.addEventListener('beforeinstallprompt', e => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		console.log("beforeinstallprompt fired");
		if (setupButton == undefined) {
			setupButton = document.getElementById("setup_button");
		}
		// Show the setup button
		setupButton.style.display = "inline";
		setupButton.disabled = false;
	});

	window.addEventListener('appinstalled', e => {
		console.log("appinstalled fired", e);
	});
};

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then(serviceWorker => console.log('Service Worker registered: ' + serviceWorker))
		.catch(error => console.log('Error registering the Service Worker: ' + error));
}