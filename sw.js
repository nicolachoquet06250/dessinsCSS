const CACHE_NAME = 'V1';
const STATIC_CACHE_URLS = ['/', 'style.css', 'script.js'];

self.addEventListener('install', event => {
	console.log('Service Worker installing.');
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS))
	)
});

self.addEventListener('activate', event => {
	console.log('Service Worker activating.');
});
