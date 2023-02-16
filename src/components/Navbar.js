//import {Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme'

const Navbar = () =>{
const {mode} =useTheme()
   return (
        <nav className={`navbar ${mode}`}>
             <h1>Geolocator</h1>
            <div className="links">
              
                <a href="/">Home</a>
                <a href="/weather">Weather</a>
                <a href="/search">Search</a>
              
            </div>
        </nav>
    );

}

export default Navbar
