import React from 'react'
import './Alert.css'

export default props => {
     return (
          <div className={ props.show ? "alert-container" : "hidden" }>
              <h1>👆 Need Geolocation</h1>
          </div>
     )
}