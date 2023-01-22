import {BrowserRouter, Switch ,Route,Redirect} from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Navigator from './components/Navigator'


function App() {
  return (
    <div className="App">
    
   
      <BrowserRouter>
        <Navbar/>
        
       <Switch>
          <Route exact path="/">
             <Navigator/>
          </Route>
          <Route path="/search">
           
          </Route>
           <Route path="/weather">
          
           </Route>                  
       </Switch>
  
      </BrowserRouter>
      
    </div>
  )
}

export default App
