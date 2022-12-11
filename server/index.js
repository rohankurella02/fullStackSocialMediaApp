const exp = require('express');
const app = exp();
const mclient = require('mongodb').MongoClient;
const port = 4000;

//import path module
const path = require('path');

app.use(exp.json());

const http = require('http')
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

//connect build folder of react app with express server
app.use(exp.static(path.join(__dirname, '../build')));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });


    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.id)
    })
})   

//import userApp and productApp
const userApp = require('./routes/user.routes');
const postApp = require('./routes/post.routes.js');
const { response } = require('express');

//execute specific middleware based on path
app.use('/api/user', userApp);
app.use('/api/post', postApp);

const DBurl = 'mongodb+srv://rohandb:babu4321@cluster0.mfaor.mongodb.net/?retryWrites=true&w=majority'

//connect with mongodb server
mclient.connect(DBurl).then((client) => {
    //get the database object 
    const db = client.db('socialMediaApplication');

    //creating a collection
    let userCollection = db.collection('userCollection');
    let postCollection = db.collection('postCollection');

    //sharing collection object to API
    app.set('userCollection', userCollection);
    app.set('postCollection', postCollection);

    console.log("Connection to MongoDB Server Successful")
}).catch(err => {
    console.log("Connection to MongoDB Server Failed", err);
})





// dealing with page refresh
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//Handling Invalid URL
app.use((req, res) => {
    res.send({ message: "Invalid URL" });
})

//Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Something went wrong', error: err.message });
});



//assigning port to server
app.listen(port, () => {
    console.log("Server is running on port " + port);
})
server.listen(3001, () => {
    console.log('listening on *:3001');
})
