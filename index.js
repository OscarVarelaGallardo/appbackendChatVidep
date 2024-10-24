// Importaciones necesarias
import express from 'express';
import userRoutes from './src/Routes/userRoutes.js';
import loginRoutes from './src/Routes/loginRoutes.js';
import connection from './src/Helpers/index.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'; 

const app = express();
const port = 3000;
 app.use(cors({
    origin: '*', 
 
}));
const server = http.createServer(app); 


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});
app.use(express.json()); 
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Conexión a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

app.use('/api', userRoutes);
app.use('/api', loginRoutes);

app.use('/test',(req,res)=>{
  return   res.status(200).send({ status: 200, message: 'Pagina testing' });
})

server.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}/`);
});