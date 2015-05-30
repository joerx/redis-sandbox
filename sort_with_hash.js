'use strict';

var Redis = require('ioredis');
var redis = new Redis();

var issues = [
  {
    details: {
      description: 'bla bla',
      key: 'x-12399'
    },
    id: 12339,
    severity: 3,
    complexity: 1
  },
  {
    details: {
      descripton: 'bla foo',
      key: 'x-1382'
    },
    id: 1382,
    severity: 2,
    complexity: 5
  },
  {
    details: {
      description: 'bla foo bar',
      key: 'x-338'
    },
    id: 338,
    severity: 5,
    complexity: 3
  },
  {
    details: {
      description: 'yadda foo bla braz',
      key: 'x-9338'
    },
    id: 9338,
    severity: 4,
    complexity: 2
  }
];

// create issues as hashes
issues.forEach(function(issue) {
  redis.hset('issue:' + issue.id, 'severity', issue.severity);
  redis.hset('issue:' + issue.id, 'complexity', issue.complexity);
  redis.hset('issue:' + issue.id, 'details', JSON.stringify(issue.details));
  redis.hgetall('issue:' + issue.id, function(err, val) {
    console.log(val);
  });
});

// watchlist
var watchList = issues.map(function(issue) {
  return issue.id;
});
redis.sadd('watch:leto', watchList);
redis.smembers('watch:leto', function(err, val) {
  console.log('Leto\'s watchlist:', val);
});

redis.sort('watch:leto by issue:*->complexity get issue:*->details'.split(' '), function(err, res) {
  console.log(res);
});

redis.quit();
