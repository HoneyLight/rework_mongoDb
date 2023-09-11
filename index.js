
// this is the boiler plate for most handlebars project

let express = require('express')
let exhbs = require('express-handlebars')
let app = express()
let PORT = 6000

app.engine('hbs', exhbs.create({

}))

app.set('view engine' , "hbs")
app.set("views", "viwes")

app.use(express.static(__dirname+ '/public'))

app.get('/', function(req,res){
    res.render("index")
})

app.listen(PORT)
console.log("app running on port :" + PORT )