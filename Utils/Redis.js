// redisClient.js
const { createClient } = require('redis');
require('dotenv').config();
const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true, // Upstash requires TLS
    },
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});


module.exports = redisClient;




// // Example: Caching student data
// const redisClient = require('./redisClient');

// app.get('/api/students', async (req, res) => {
//   const cached = await redisClient.get('students');

//   if (cached) {
//     console.log('⚡ Cache hit');
//     return res.json(JSON.parse(cached));
//   }

//   // Fetch from DB if not cached
//   const students = await Student.find();
//   await redisClient.set('students', JSON.stringify(students), {
//     EX: 3600, // cache for 1 hour
//   });

//   res.json(students);
// });
