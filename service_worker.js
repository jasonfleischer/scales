const CACHE_NAME = 'v1';
const CACHE = [
        '/scale/index.html',
        '/scale/css/bundle.css',
        '/scale/js/bundle.js'
      ];
	
self.addEventListener('install', function(event) {
    console.log('scale: install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHE);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('scale: fetch');
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', function activator(event) {
    console.log('scale: activate');
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});
