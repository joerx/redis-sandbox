var Redis = require('ioredis');
var pub = new Redis();

setInterval(function() {
  var message = new Date().toUTCString();
  console.log(message);
  pub.publish('zeitansage', message);
}, 1000);
