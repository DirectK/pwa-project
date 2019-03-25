if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope:', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

var CACHE_NAME = 'my-site-cache-v0';
var urlsToCache = [
  '/'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith( caches.match(event.request).then(function (response) {
    if (response) {
      return response;
    }
    
    return fetch(event.request.clone()).then(function (response) {
      if(!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
    
      var responseToCache = response.clone();
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, responseToCache);
      });
      
      return response;
    });
  }));
});