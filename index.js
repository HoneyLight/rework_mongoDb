
// this is the boiler plate for most handlebars project

let express = require('express')
let exhbs = require('express-handlebars')
let app = express()
let mongoose = require('mongoose');
let path = require('path');
require('dotenv').config();

let FinanceModel = require('./models/financial_institution')

let PORT = process.env.PORT
let CON_STR = process.env.CON_STR   //we wont be using this one now cos we are using the online one as we are connected to the internet.
let ONLINE_CON = process.env.MONGO_URL    //the 'markets' here is the name you choose to call your database. check the .env file to see better.

// any mongodb server runs by default on port 27017

mongoose.connect(ONLINE_CON, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connection.on('open', () => console.log("Mongo server connected"))
mongoose.connection.on('error', (e) => console.log(e))

app.engine('hbs', exhbs.engine({
    extname: "hbs",
    layoutsDir: "views",
    defaultLayout: "main"
}))

app.set('view engine' , "hbs")
app.set("views", "views")

// app.use(express.static(__dirname+ '/public')) //you can write your public like this but for the sake odf security, its best you use path so it wont be hacked. see the step below

let public = path.join(__dirname, "public")
app.use(express.static(public))

app.use(express.json()) //serializing json data
app.use(express.urlencoded({extended:true})) //serializing form data

app.get('/', function(req,res){
    res.render("index", {title:"home"})
})
app.get("/contact", function(req, res){
    let users = [
        {
            id:"1",
            name: "Debby Bee"
        }
    ]
    res.render("contact", {title:"contact", phones:[+234, +456], users})
})

//CREATE A DATA VIA YOUR POST REQUEST
app.post("/create-finance", async function(req, res) {
    try{

        let finance = new FinanceModel(req.body)
        await finance.save()

        console.log(req.body);
        res.send(finance)
    }catch(err){
        res.send(err.message)
    }
})

// READ/GET this is to get all the data
app.get("/finances", async function(req,res){
    try{
        let finances = await FinanceModel.find()
        res.send(finances)
    }catch(err){
        res.send(err.message)
    }
})

//this is to get a single data by id.
app.get("/finances/:id", async function(req,res){
    try{
        let {id} = req.params
        let finance = await FinanceModel.findById(id)
        res.send(finance)
    }catch(err){
        res.send(err.message)
    }
})

// DELETE
app.delete("/finances/:id", async function(req,res){
    try{
        let {id} = req.params
        let finance = await FinanceModel.findById(id)

        if(!finance) return res.status(404).json({"msg":"The id does not exist", code:404})

        finance.deleteOne()
        res.send({msg: "Deleted successfully", code:200})
    }catch(err){
        res.send(err.message)
    }
})

// UPDATE/PUT
app.put("/finances/:id", async function(req,res){
    try{
        let {id} = req.params
        let finance = await FinanceModel.findById(id)

        if(!finance) return res.status(404).json({"msg": "The id does not exist", code :404})
        
        // THIS METHOD BELOW WILL EDIT THEM ONE BY ONE AND YOU HAVE TO SPECIFY THEM INDIVIDUALLY AND ITS A LONG ROUTE
        // finance.name = req.body.name
        // finance.type = req.body.type
        // finance.email = req.body.email;

        // finance.save()

        let data = finance._doc;  //(_doc) is the standard key to get all  your data.
        finance.overwrite({...data, ...req.body})
        finance.save()

        res.send({msg: "Updated successfully", code:200})
    }catch(err){
        res.send(err.message)
    }
})

app.listen(PORT)
console.log("app running on port http://localhost:" + PORT )