import {useState,useEffect,useCallback} from 'react'
import Home from '../pages/Home'

export default function Track () {

const [isPending,setIsPending]=useState(false)
const [lon,setLon] = useState (0)
const [lat,setLat] = useState (0)
const [accur, setAccure]= useState (0)
const [id, setId] = useState (0)
const [crd, setCrd] = useState(null)


const fetchPosition = useCallback( async (success, error, options) =>{
 
 
           setIsPending(true)
           let id = await navigator.geolocation.watchPosition(success, error, options);
               options = {
  		   enableHighAccuracy: true,
  		   timeout: Infinity,
   		   maximumAge: 0
  		   };
             
           
            function success(pos) {
            	  const crd = pos.coords;
                  setLon(crd.longitude); 
		  setLat(crd.latitude); 
		   console.log(crd.accuracy.toFixed(0))	                     
                  setId(id);
                 setIsPending(false)
                  // localStorage.setItem('LonWatch', JSON.stringify(crd.longitude));
                  // localStorage.setItem('LatWatch', JSON.stringify(crd.latitude));
                 setCrd(pos.coords)
                  }
                  
            function error(err) {
                  console.error(`ERROR(${err.code}): ${err.message}`);
                 }
       },[])
       
       
       useEffect(() => {
                
       fetchPosition();  
      
       
     },[crd,fetchPosition])  
     
    
  return (
  
  <div>
 <Home lon={lon} lat={lat}  id={id} fetchPosition={fetchPosition}/>
  </div>
  )    
}


