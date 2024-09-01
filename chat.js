import dotenv from 'dotenv'
import { createClient } from "@libsql/client"
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

const db = createClient({
    url: "libsql://good-clover-eltitoruiz.turso.io",
    authToken: process.env.DB_TOKEN
});

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID TEXT,
        content TEXT
    );
`); 

app.use('/client/style', express.static(process.cwd() + '/client/style'));
app.use('/client/img', express.static(process.cwd() + '/client/img'))
app.use('/client/script', express.static(process.cwd() + '/client/script'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd()+'/client/index.html');
});

const getAllMessages = async () =>{
    try{
        return (await db.execute('SELECT * FROM messages ORDER BY id ASC')).rows
    } catch (e) {
        console.log(e);
        return [];
    }
}

io.on('connection', async (socket)=>{
    console.log('a user connected')
    const messages = await getAllMessages();
    socket.emit('load messages', messages)

    socket.on('chat message', async (msg, userId)=>{

        let result;

        try{
            result = await db.execute({
                sql: `INSERT INTO messages (userId, content) VALUES (:userId, :content)`,
                args: {userId: userId, content: msg}
            })
        } catch(e){
            console.log(e)
            return
        }

        io.emit('chat message', msg, userId)
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})  

const PORT = process.env.PORT ?? 3000

server.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`)
})