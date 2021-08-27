const request=require('request')

const weathercode=(loc_lat,loc_long,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=039acf5caa31819fd97786619cde3ac1&query='+loc_lat+','+loc_long+'&units='
 
    request({url,json: true}, (error, {body})=>{
 
          if(error){
             callback("Unable to connect weatherStack API, please check connection",undefined);
          }
          else if(body.error){
             callback("Unable to find location",undefined);
          }
          else{
             callback(undefined,
                body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out.It feels like "+body.current.feelslike+" degrees out."
                )   
          }
       
    })
 }


 module.exports=weathercode