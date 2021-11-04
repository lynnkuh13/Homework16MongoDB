const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://happydays111:dummy123@cluster0.2as0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
, {useNewUrlParser: true}) // connect to the database

mongoose.connection.once('open', function() {
    console.log("CONNECTED TO DB");
})

const FruitSchema = new Schema({
    fruit: String,
    color: String
})

const FruitModel = mongoose.model("Fruits" , FruitSchema);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async function(req, res) {
    const fruits = await FruitModel.find();
    console.log("Fruits: ", fruits)

    res.json(fruits);
   
})

app.post('/post', function(req, res) {
    let fruitObj = {
        fruit: "Banana",
        color: "yellow"
    }
    const fruit = FruitModel.create(fruitObj);
    console.log("FRUIT OBJ: ", fruit);
 //   console.log("Req: ", req.body);
    res.send({post: "Info posted"});

})

app.listen("3402", () => {
    console.log("App listening on port 3402");
})





