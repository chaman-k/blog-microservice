var redis = require('redis');
var client = redis.createClient();
var Queue = require('bee-queue');
var queue = new Queue('microservice');


client.on('connect', function() {
    console.log('connected');
});
queue.on('ready', function () {
  queue.process(function (job, done) {
    console.log('processing job ' + job.id);
    setTimeout(function () {
    if(job.data.x==0){
        client.get('framework', function(err, reply) {
            console.log(reply);
            if(reply==null){
                done(null);
            }else{
            done(null, client.set(job.data.id, 0));}
        });
        }
    else{
        done(null, client.incr(job.data.id));
      }
    }, 10);
  });

  console.log('processing jobs...');
});