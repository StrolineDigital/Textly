const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//This function handles the precaching of the application
precacheAndRoute(self.__WB_MANIFEST);

//This function manages the cache for the pages of the application
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
// This caches the pages of the application
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// This caches the pages of the application
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// This caches the assets of the application
registerRoute(
  /\.(?:js|css|html|json|png)$/,
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
         ],
  })
);
// This caches images with unique IDs
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)\?[a-f0-9]+$/, // Match filenames with hash IDs
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);



