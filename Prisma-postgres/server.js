import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())

//
BigInt.prototype.toJSON = function () { return this.toString() }


// add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send("Hi Everyone");
})

// adding Routes
import routes from './routes/api.js';
app.use("/api", routes);

app.use("/search", (req, res) => {
    const { q } = req.query;

    setTimeout(() => {
        res.send([
            {
                name: q
            },
            {
                name: q + q
            }
        ])
    }, q.length * 100);
})



app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});