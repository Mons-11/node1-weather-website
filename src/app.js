const path=require('path') //core-module
const express= require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode.js')
const weathercode=require('./utils/weather_code.js')


console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname,'../..'))//go up two folders
console.log(path.join(__dirname,'../public'));//path.join comes from core module require('path')

//Definepaths for express config
const mainDir=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../template/views');
const partialPath=path.join(__dirname,'../template/partials')

const app =express()
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(mainDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather Report",
        name:"Mononita Mahato"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:"Mononita"
    })
})


// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })    //It wont be used as node will go through the index.html match..


app.get('/help',(req,res)=>{
    res.send({
        name:'Mononita',
        age:24})
})


// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page<h1>')
// })

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
       return res.send({
           Error:'Please enter specific address.'
       })
    }
    geocode(req.query.address,(error,{lat,long,location}={})=>{
        if(error)
        {
           return res.send({
                error
            })
        }

        weathercode(lat,long,(error,forecast)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast
               
            })
            console.log(forecast);
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            Error:"You must provide search option."
        })
    }

    res.send({
        products:[]
    })
})
//app.com
//app.com/help
//app.com/about


app.get('/about/*',(req,res)=>{
    res.render('error',{
        title:"About article not found",
        name:'Mononita'
    })
})

//for pages expect mentioned above--* wildcard character---need to come last--as the node matches from to, 
//if match found it doesnot look the next match.
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404:Page Not Found',
        name:'Mononita'
    })
})
app.listen(3000, ()=>{
    console.log("Server is up on port 3000");
})