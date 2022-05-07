const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();


//user = owner1;
//password = EpEV9jHRkUwpGcOX;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gvqth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {
    try {
        await client.connect();
        const watchCollection = client.db('warehouse').collection('watches');


        app.get('/items', async (req, res) => {
            const query = {};
            const cursor = watchCollection.find(query);
            const watches = await cursor.toArray();
            res.send(watches);
        });
        app.post('/items', async (req, res) => {
            const newWatch = req.body;
            const result = await watchCollection.insertOne(newWatch);
            res.send(result);
        });


    }
    finally {

    }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server Started")
})

app.listen(port, () => {
    console.log("Server is Running on port", port)
})