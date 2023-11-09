import express from "express";
import morgan from "morgan";
import {Server} from "socket.io"
import {createServer} from 'node:http'
import dotenv from "dotenv";
import {createClient} from "@libsql/client";

dotenv.config();

const port = process.env.PORT ?? 8080

const app = express();
const server = createServer(app);

const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 6 * 60 * 1000
    },
    cors: {
        origin: "*"
    }
});

const db = createClient({
    url: "libsql://stirring-bronze-tiger-abritom93.turso.io",
    authToken: process.env.DB_TOKEN
})

await db.execute(`
   CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      username TEXT
   )
`)
io.on("connection", async (socket) => {
    console.log("a user has connected")

    socket.on("disconnect", () => {
        console.log("a user has disconnected")
    })

    socket.on("chat", async (msg, username) => {
        console.log("Msg: ", msg)
        console.log("User: ", username)
        let result;
        const user = username ?? "anonymous";
        try {
            result = await db.execute({
                sql: `INSERT INTO messages (content,username) VALUES (:content,:username)`,
                args: {
                    content: msg,
                    username: user
                }
            })
        } catch (e) {
            console.error(e)
            return
        }
        io.emit("chat", msg, result.lastInsertRowid.toString(), user)
    })

    socket.on("clearMessage", async () => {
        try {
            await db.execute({
                sql: `delete from messages`,
                args: {}
            })
            io.emit("clearMessage", "OK")
        } catch (e) {
            console.error(e)
            io.emit("clearMessage", "KO")
        }
    })

    socket.on("writing", (author) => {
        io.emit("writing", author)
    })

    socket.on("writingEnd", (author) => {
        io.emit("writingEnd", author)
    })

    if (!socket.recovered) {
        try {
            const results = await db.execute({
                sql: 'Select id, content, username from messages where id > :id',
                args: {
                    id: socket.handshake.auth.serverOffset ?? 0
                }
            })
            results.rows.forEach(row => {
                socket.emit("chat", row.content, row.id.toString(), row.username)
            })
        } catch (e) {
            console.error(e);
        }
    }
})

app.use(express.static('/app/client/dist'));

app.use(morgan("dev"))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "app", "client", 'dist', 'index.html'));
});

server.listen(port, () => {
    console.log("running on port", port)
})