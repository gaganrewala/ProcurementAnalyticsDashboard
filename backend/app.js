const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/data') && req.method === 'GET') {

    // const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    // Set the CORS headers manually
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // fetch data from api
    http.get(`http://localhost:3333/users/${id}`, externalRes => {
      let data = ''
      externalRes.on('data', chunk => {
        data += chunk
      });
      externalRes.on('end', () => {
        // parse the fetched data 
        const parsedData = JSON.parse(data)

        //send the data as a response to the angular app
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        console.log(parsedData)
        res.end(JSON.stringify(parsedData))
      });
    });
  } else {
    res.statusCode = 404
    res.end();
  }
})
server.listen(8080, () => {
  console.log("Server is running on 8080")
})

// const express = require('express');
// const app = express();
// const port = 3000;
// // Define your routes
// // 
// app.get('/data', (req, res) => {
//   // res.send('ansari');
//   const data = {
//     message: 'Hello, Express!',
//     timestamp: new Date()
//   };
  
//   res.json(data);
// });

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });