import React from 'react'
import '../App.css'
import Mainbody from './Mainbody';
// import logo from '../images/sun'


const logo = require('../images/sun.png'); // with require
export default function Header() {
  return (
    <div className='headerwrapper container-fluid'>
        <div className='navlocal'>
            <a className='brand' href='#'>
                {/* <img src={logo} className='align-top navimage' alt=""/> */}
            <p className='container-fluid'>TheWeatherApp</p></a>
        </div>
      
        
    </div>
  )
}
