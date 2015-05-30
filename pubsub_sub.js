var Redis = require('ioredis');
var sub = new Redis();

sub.subscribe('zeitansage', function(err, count) {
  if (err) console.error(err);
  else console.log('subscribed to %s channel(s)', count);
});

sub.on('message', function(channel, message) {
  console.log('%s: %s', channel, message);  
});
