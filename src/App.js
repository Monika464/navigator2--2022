import {BrowserRouter, Switch ,Route,Redirect,NavLink} from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import ThemeSelector from'./components/ThemeSelector'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Search from './pages/Search'
import './App.css'


function App() {
  const {mode} =useTheme()
 // console.log('modeApp',mode)


  return (
    <div className={`App ${mode}`}>
 
    
      <BrowserRouter>
          <nav className={`navbar ${mode}`}>
                  <h1>Geolocator</h1>
                   <div className="links">  
                      <NavLink exact to="/">Navigator</NavLink>
                      <NavLink exact to="/search">Search</NavLink>
                      <NavLink exact to="/weather">Weather</NavLink> 
                    </div> 
                </nav> 
         <ThemeSelector/>
         
        <Switch>
          <Route exact path="/">
             <Home/>         
          </Route>
          <Route path="/search"> 
          <Search/>
          </Route>
           <Route path="/weather"> 
           <Weather/>      
           </Route>                      
       </Switch>
      
       <Footer/>
      </BrowserRouter>
      
    </div>
  )
}

export default App
