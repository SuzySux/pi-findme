import {createServer} from 'node:http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
    res.render('index');
});
//await significa que js debe esperar a que la linea termine antes de ejecutar la siguiente.
await server.listen (port);
console.log(`Server is running on port ${port}`);
//fua wtf