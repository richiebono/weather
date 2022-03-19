import React from 'react'
import './Styles.css'
import Icons from './icons.jsx'


export default props => {
     if (!props.forecasts) { // verifica se os dados chegaram antes de iniciar
          return null;     
     }
     
     const weekday = (dt) =>{

          var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
          var dayNum = new Date(dt * 1000).getDay();
          var result = days[dayNum];

          return result;
     }

     const forecasts = props.forecasts
     const days = forecasts.map((elem, index) => {
          if(index === 0) return   <div key={index} className='firstdivofdays'>
                                        <h1 className='menu-firstday'>{weekday(elem.dt)}</h1>
                                        <div>
                                             <h1 className='menu-degrees'>{props.celsius}º</h1>
                                        </div>
                                        <Icons code={elem.weather[0].main}/>
                                   </div>
               
          if(index < 7){
                    console.log(elem.weather[0].main);
                    return    <div key={index} className='divofdays'>
                                   <h1 className='menu-days'>{weekday(elem.dt)}</h1>
                                   <div className='menu-max-min'>
                                        <p className='menu-max'>{elem.temp.max}º</p>
                                        <p className='menu-min'>{elem.temp.min}º</p>
                                   </div>
                                   <Icons code={elem.weather[0].main}/>
                              </div>
               }else{
                    return false
          }
     })
  
     return(
          <div className='WeatherMenu-div'  >
               {days}
          </div>
     )

}
