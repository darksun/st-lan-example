var express = require('express')
var app = express()

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// respond with "Hello World!" on the homepage
app.get('/description', function (req, res) {
  res.send('Hello World!');
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

//SSDP Server
var SSDP = require('node-ssdp').Server
  , ssdpServer = new SSDP({
	logLevel: 'INFO',
	location: 'http://' + require('ip').address() + ':3000/description'
  })

ssdpServer.addUSN('upnp:rootdevice')
// server.addUSN('urn:schemas-upnp-org:device:MediaServer:1')
// server.addUSN('urn:schemas-upnp-org:service:ContentDirectory:1')
// server.addUSN('urn:schemas-upnp-org:service:ConnectionManager:1')

ssdpServer.on('advertise-alive', function (heads) {
  //console.log('advertise-alive', heads)
  // Expire old devices from your cache.
  // Register advertising device somewhere (as designated in http headers heads)
})

ssdpServer.on('advertise-bye', function (heads) {
  //console.log('advertise-bye', heads)
  // Remove specified device from cache.
})

// start server on all interfaces
ssdpServer.start('0.0.0.0')