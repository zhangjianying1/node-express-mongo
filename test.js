var  cluster = require('cluster');
var os = require('os');
var http = require('http');

if (cluster.isMaster) {
	os.cpus().forEach(function(){
		cluster.fork();
	})
	cluster.on('listening', function(worker, address){
		console.log('workwe: id' +  worker.id + 'work path:' + address.address + 'worker process id:' + worker.process.pid)
	});
} else {
	console.log(cluster.worker.id + 'pid' + process.pid)
	http.createServer(function(req, res){
		console.log(cluster.worker.id)
		res.end('worker id' + cluster.worker.id + 'process id' + process.pid);
	}).listen(8000);
}