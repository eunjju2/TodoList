import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const PORT = process.env.PORT ||  8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
.then(() => {
    console.log('연결')
    app.listen(PORT, () => {
        console.log(`연결 완료. http://localhost:${PORT}`)
    })
})
.catch((error) => console.log(error));


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});