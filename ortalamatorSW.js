self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open("subpage-cache-v1").then((cache) => {
			return cache.addAll(["/ortalamator.html", "/static/images/ortalamator192.png", "/static/images/ortalamator512.png"]);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
