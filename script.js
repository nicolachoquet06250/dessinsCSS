function on_submit() {
	if(document.querySelector('input[type=search]').value !== '') {
		window.location.href = 'https://www.google.com/search?q='
			+ document.querySelector('input[type=search]').value.replace(' ', '+')
			+ '&oq=' + document.querySelector('input[type=search]').value.replace(' ', '+');
	}
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
};

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then(serviceWorker => console.log('Service Worker registered: ' + serviceWorker))
		.catch(error => console.log('Error registering the Service Worker: ' + error));
}