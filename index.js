
// this is the boiler plate for most handlebars project

let express = require('express')
let exhbs = require('express-handlebars')
let app = express()
let mongoose = require('mongoose')
let PORT = 5000
let CON_STR = "mongodb://localhost:27017/finance"    //we wont be using this one now cos we are using the online one as we are connected to the internet.
let ONLINE_CON = "mongodb+srv://chiketaradeborah11:d0yCzz2bNE1DmtvI@bee-cluster.9gnn88f.mongodb.net/markets"    //the 'markets' here is the name you choose to call your database.

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

app.use(express.static(__dirname+ '/public'))

app.get('/', function(req,res){
    res.render("index")
})

app.listen(PORT)
console.log("app running on port http://localhost:" + PORT )