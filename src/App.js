import {BrowserRouter, Switch ,Route,Redirect} from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Search from './pages/Search'



function App() {



  return (
    <div className="App">
 
    
      <BrowserRouter>
        <Navbar/> 
         
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
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
