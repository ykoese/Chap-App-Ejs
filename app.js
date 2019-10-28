/* const express= require('express');
const app = express(); */

// set the teamplate engine ehs

/* app.set('view engine', 'ejs'); */

//middlewares

/* app.use (express.static('public')); */

//routes

/* app.get('/', (req, res)=> {
    res.render('index');
})
 */
//Listen port on 3000
/* server= app.listen(8585); */

//listen on every connection
/* Here, the io object will give us access to the socket.io library. io object is now listening to each connection to our app. Each time a new user is connecting, it will print out “New user connected” in our console. */

/* const io= require('socket.io') (server);
io= on('connection', (socket)=>{
    console.log('New user connected')

}) */


/* Client side
We just have to change a line in our app.js. In fact, we don’t want to display a « Hello world » message, but a real window with a chat box, inputs to write username/message and a send button. To do that we have to render an html file (which will be in our case an ejs file) when accessing the “/” root.

So you need to apply the render method to the res object. */

const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
        console.log(data, socket.username);
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})


