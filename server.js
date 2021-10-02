import express from 'express';
import mongoose from 'mongoose';
import Cards from './cadrsModel.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const { PORT, DB_CONNECTION_URL } = process.env;


mongoose.connect(
    DB_CONNECTION_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send('Hello TheWebDev')
});

app.post('/dating/cards', (req, res)=>{
    const card = req.body;
    Cards.create(card, (err, data)=>{
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
})

app.get('/dating/cards', (req, res)=>{
    Cards.find((err, data)=>{
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
})

app.listen(PORT, ()=>console.log(`Listening on localhost:${PORT}`));