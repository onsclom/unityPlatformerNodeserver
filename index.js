var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;
/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
*/


io.on('connection', onConnect);

players = {};

function onConnect(socket)
{
    console.log("A user connected!");

	socket.on('beep', function(data){
        console.log({position:data.position, rotation:data.rotation, dir:data.dir});
        players[socket.id] = {position:data.position, rotation:data.rotation, dir:data.dir};
		socket.emit('boop', players);
    });
    
    socket.on('disconnect', function(){
        console.log("A user disconnected!");
        socket.broadcast.emit('leaver', {"id": socket.id});
        delete players[socket.id];
        console.log(players);
    });
}
/*
io.on('connection', function(socket){
  console.log('a user connected');
});
*/
http.listen(port, function(){
  console.log('listening on ' + port);
});


/*
var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4567);

io.on('connection', function(socket){
	socket.on('beep', function(){
		socket.emit('boop');
	});
})
*/