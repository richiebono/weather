  import React from 'react'
import cloudy from '../../assets/weather-icons/cloudy.svg'
import cloudyday from '../../assets/weather-icons/cloudyday.svg'
import cloudynight from '../../assets/weather-icons/cloudynight.svg'
import day from '../../assets/weather-icons/day.svg'
import night from '../../assets/weather-icons/night.svg'
import rain from '../../assets/weather-icons/rain.svg'
import snow from '../../assets/weather-icons/snow.svg'
import thunder from '../../assets/weather-icons/thunder.svg'
import weathersprite from '../../assets/weather-icons/weathersprite.svg'

export default props => {

     const obj = {
          Thunder: thunder,
          Rain: rain,         
          Snow:  snow,         
          Clouds: cloudy,         
          Cloudynight: cloudynight,
          Cloudyday: cloudyday,
          Night: night,
          Day: day, 
          Weathersprite: weathersprite,
          Clear: day       
     }

     let condition 

     Object.keys(obj).forEach(function(index){ //get the code passed  
          if(props.code === index){
               condition = obj[index]
          }
     })
     return <img src={condition} ></img>  
}