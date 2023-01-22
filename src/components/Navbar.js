//import {Link } from 'react-router-dom';
const Navbar = () =>{

   return (
        <nav className="navbar">
             <h1>Geolocator</h1>
            <div className="links">
              
                <a href="/">Navigator</a>
                <a href="/weather">Weather</a>
                <a href="/search">Search</a>
              
            </div>
        </nav>
    );

}

export default Navbar
