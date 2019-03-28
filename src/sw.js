var CACHE_NAME = 'cache-7774';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope:', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    fetch("/urls_to_cache").then(function (response) {
      return response.json().then(function (urlsToCache) {
        return cache.addAll(urlsToCache);
      });
    })
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith( 
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (response) {
        return response || caches.match("/");
      });
    })
  );
});