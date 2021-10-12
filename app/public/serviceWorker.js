console.log("In serviceWorker.js file")

var cn = 'student-tracker-v3'
var pageList = ['./index.html' ]


self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cn).then(function(cache){
            console.log('Opened cache');
            return cache.addAll(pageList);
         })
    )
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(cache =>{
          if (cache != cacheNames){
            console.log("Deleting old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// self.addEventListener('activate', function(event){
//   console.log("Activating Service Worker");
//   event.waitUntil(
//     //clearCaches()
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//         }).map(function(cacheName) {
//           return caches.delete(cacheName);
//         })
//       );
//     })
  
// })


self.addEventListener('fetch', function(event){
  const req = new URL(event.request.url);
  event.respondWith(
      //fetch(event.request).catch(() => caches.match(event.request))
      fetch(event.request).then(networkResponse =>{
        let resClone = networkResponse.clone();
        nrstatus = networkResponse.status
        if(nrstatus >= 200 && nrstatus <= 300 || req.origin != location.origin){
          if(event.request.method === 'GET' && event.request.url.startsWith('http')){
            caches.open(cn).then(cache =>{
              if(!(event.request.url.startsWith('http://localhost/api'))){
                //console.log(event.request.url)
                cache.put(event.request, resClone);
            }
            })
          }
          return networkResponse;
        }
        return cacheReturn(event.request)
      }).catch(error => {
        return cacheReturn(event.request)
      })
  )
})

function cacheReturn(request){
  const requrl = new URL(request.url);
  return caches.match(request).then(cachedResponse =>{
    if(cachedResponse){
      return cachedResponse;
    }
    return(null, {status:404})
  })
}

