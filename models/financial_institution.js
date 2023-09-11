let mongoose = require('mongoose')

let social_handle = {
    facebook:"",
    instagram:"",
    tiktok:"",
    twitter:""
}

let financeInstituteSchema = new mongoose.Schema({
    name: {type:String, required:true},     //the required here is to enforce a not null contraint meaning it cant be a null also the type:String is making sure that the datatype of the name is given as a string. you can also have type:boolean etc.
    type: {type:String, required:true},
    logo: {type:String, required:false},
    email: {type:String, required:true, unique:true},  //this unique:true is saying peradventure someone else have an email you are inputing, let it not allow you so that we dont have two same emails.
    social_media: {type:Object, required:false, default:social_handle}, //the default is saying if the person doesnt provide anything, all of the handles name will just be there.
    is_verified: {type:Boolean, default:false}
})

let financeInstitute = mongoose.model("financial_institutes", financeInstituteSchema); //financial_institutes is the name we want to call our collection
module.exports = financeInstitute;