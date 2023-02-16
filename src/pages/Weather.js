//import './Weather.css'
import {useState,useEffect,useCallback} from 'react'
//import { useWeather } from './hooks/useWeather'
import  useTrack  from '../hooks/useTrack'
//import { useMapPos } from './hooks/useMapPos'
import { useFetch } from '../hooks/useFetch'
//import {useRevGeo} from './hooks/useRevGeo'

export default function Weather() {

 //const {weatherUrl} = useWeather()
 const {lon,lat} = useTrack()
 

 const [weatherUrl,setWeatherUrl] = useState("")
 //const[wetherDestUrl,setWetherDestUrl] = useState("")
 
const[places,setPlaces] = useState("")
 const [error,setError] = useState(null)
const[country,setCountry] = useState("pl")
const[limit,setLimit]=useState(3)
const[place,setPlace] = useState("")
const[formControlShow,setFormControlShow]=useState(false)
const [coordsFromForm,setCoordsFromForm] = useState("")
const [lonFromForm, setLonFromForm]= useState("")
const [latFromForm, setLatFromForm]= useState("")
const[showTargetWeather,setShowTargetWeather]=useState(false)
const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 




    useEffect(() => {

           const showWeather = async (lonn,latt) =>{
           setWeatherUrl(`http://www.7timer.info/bin/astro.php?lon=${lonn}&lat=${latt}              &ac=0&lang=en&unit=metric&output=internal&tzshift=0`);
                    
           }
           showWeather(lon,lat);

   
     },[lon,lat ])
   

// form place/location submit form handler
		const handleSubmitSearchForm =(e)=>{

		e.preventDefault();
		setPlace(place)
	        setCountry(country)
	        setLimit(limit)
		//console.log("u",place)

/*
           //funcja fetch destination
		const fetchD = async(long,lat) => {

  			
  			const url =   `https://eu1.locationiq.com/v1/search?key=${myMapApiKey}&q=${place}&format=json&countrycodes=${country}&limit=${limit}&dedupe=1&zoom=18`;       
            
           		 setIsPendingW(true)
    
         		 try {
          		const res = await fetch(url)
          		if(!res.ok) {
          		  throw new Error(res.statusText)
          	 	 }
    	 	 	const json = await res.json()
         		 setIsPendingW(false)
    	 		 setPlaces(json)
    	 		 setError(null)
    	 	 
   	       		 } catch (err) {
   	        	 	  if(err.name ==="AbortError") {
   	         	 		 console.log('the fetch was aborted')}
   	         	 	 else{
   	         	 	 setIsPendingW(false)
     		  		 setError('Can not find this place')
     		  		 console.log("Can not find this place",err.message)
   	           		}
   		 
            	 		}
       			 } 
        
          
   	fetchD()
   */
	}
	
const handleResetDestinations =()=>{
setPlaces(null)
}




//console.log("co jest",geocoordinates from form)	

 const handleSubmitCordsForm =(e) =>{
            e.preventDefault();
             let splitCords =  coordsFromForm.split(","); 
             setLonFromForm(splitCords[0]);
             setLatFromForm(splitCords[1]);
             setShowTargetWeather(true);
        
        
           }
  //console.log("cdf",coordsFromForm,coordsFromForm[0])
  
  const handleClear =() =>{
  setShowTargetWeather(false);
       setCoordsFromForm(0);
       
       //console.log("uuuu")
       }
  

  
return (


  <div className ="search-list-nav">
  
  
    <div>
 	<h2>Paste geocoordinates (Lat,Lon) to check 3 days weather forecast</h2>
      	<form className="cords-form" onSubmit={handleSubmitCordsForm}>
        	 <label>
          	      <div>Target geocoordinates </div>
         	       <input type="text" 
                       onChange={(e) =>setCoordsFromForm(e.target.value)}
            	       value={coordsFromForm}
                       />
                 </label>
         	     <div>
       		        <span><button>Send</button> 
       		        <button onClick={handleClear}>Clear</button></span>
      		      </div>
      </form>

   <p>{coordsFromForm}</p>
   
    {showTargetWeather && <img src={`http://www.7timer.info/bin/astro.php?lon=${lonFromForm}&lat=${latFromForm}              &ac=0&lang=en&unit=metric&output=internal&tzshift=0`}/>}

</div>
</div>
)
}


