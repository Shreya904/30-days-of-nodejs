const cache = {};
const express = require('express');
const request = require('supertest');
const cacheExpirationTime = 60 * 1000; // Cache expiration time in milliseconds (1 minute)

function cachingMiddleware(req, res, next) {
  const url = req.originalUrl || req.url;
  const cachedResponse = cache[url];

  if (cachedResponse && Date.now() < cachedResponse.expirationTime) {
    // If there is a cached response and it's within the expiration time, return it
    console.log(`Returning cached response for ${url}:`, cachedResponse);
    res.send(cachedResponse.body);
  } else {
    // If there's no cached response or it has expired, proceed with the request
    const originalSend = res.send;
    res.send = (body) => {
      // Calculate the expiration time
      const expirationTime = Date.now() + cacheExpirationTime;
      // Cache the response with the expiration time
      cache[url] = {
        body: body,
        expirationTime: expirationTime
      };
      console.log(`Cached response for ${url}:`, cache[url]); // Debug statement
      originalSend.call(res, body);
    };
    console.log(`Proceeding with request for ${url}`); // Debug statement
    next();
  }
}



// Test cases
// 1. Make a request, cache the response, and make the same request again within the cache expiration time.
// 2. Make a request, cache the response, wait for cache expiration, and make the same request again.

// Simulating Express app
const app = express();

// Adding caching middleware
app.use(cachingMiddleware);

// Test case 1
app.get('/test', (req, res) => {
  res.send('Cached response');
});

// Test case 2 problem occuring 
setTimeout(() => {
  app.get('/test', (req, res) => {
    res.send('New response after cache expiration');
  });
}, cacheExpirationTime + 1000); // Wait for cache expiration time + 1 second

// Making requests
request(app)
  .get('/test')
  .expect(200)
  .expect('Cached response')
  .end((err, res) => {
    if (err) throw err;
    console.log("Test case 1 passed");
  });

setTimeout(() => {
  request(app)
    .get('/test')
    .expect(200)
    .expect('New response after cache expiration')
    .end((err, res) => {
      if (err) throw err;
      console.log("Test case 2 passed");
    });
}, cacheExpirationTime + 2000);