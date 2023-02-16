//import './Search.css'

import {useState, useEffect,useCallback} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import useRefresh  from '../hooks/useRefresh'


//poczatek komponentu
export default function Search() {

const [title,setTitle] = useState('');
const [date,setDate] = useState('');
const[location, setLocation] = useState('Krakow');

//tu ma byc wynik szukania nearbay
const[placesNearby, setPlacesNearby] = useState()

//szukane miejsce w pierwszym formulatzu
const[place,setPlace] = useState("")

const[places,setPlaces] = useState("")
const [data, setData] = useState(null)
const [isPending,setIsPending]=useState(false)
const [error,setError] = useState(null)
const[country,setCountry] = useState("pl")
const[limit,setLimit]=useState(3)
const[limitNear,setLimitNear]=useState(100)
const [copied, setCopied] = useState(false);


let[latNearby, setLatNearby] = useState()
let[lonNearby, setLonNearby] = useState()
const [radius,setRadius]= useState(100)
const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304";

//string z lat i on wklejona do formularza geolocat search nearby
const[geoloTerm, setGeoloTerm] = useState("");
const[tag,setTag] = useState("")
const[formControlShow,setFormControlShow]=useState(false)

const {refreshPage} = useRefresh ()
 //const {lonWatch,latWatch,id,accur,isPending} = useTrack()
 

const odzyskGeocord =()=>{
//geoloTerm.split

//console.log(geoloTerm.split(",")[0]);
lonNearby = geoloTerm.split(",")[0];
latNearby = geoloTerm.split(",")[1].trim();
setLatNearby(latNearby)
setLonNearby(lonNearby)

}

useEffect(() => {
      
 //odzyskGeocord()
       
},[geoloTerm]) 


 //odswiezanie strony
const clearAll=()=>{
refreshPage()
}

/*
const resetForm =()=>{
setTitle('');
setDate('');
setLocation('Krakow');
}
*/

//copy to clipboard handler
  const onClick = useCallback(({target: {innerText}}) => {
    console.log(`Clicked on "${innerText}"!`);
  }, [])
  
    const onCopy = useCallback(() => {
    setCopied(true);
  }, [])



// form place/location submit form handler
		const handleSubmitSearchForm =(e)=>{

		e.preventDefault();
		setPlace(place)
	        setCountry(country)
	        setLimit(limit)
		//console.log("u",place)

           //funcja fetch destination
		const fetchD = async() => {

  			
  			const url =   `https://eu1.locationiq.com/v1/search?key=${myMapApiKey}&q=${place}&format=json&countrycodes=${country}&limit=${limit}&dedupe=1&zoom=18`;       
            
           		 setIsPending(true)
    
         		 try {
          		const res = await fetch(url)
          		if(!res.ok) {
          		  throw new Error(res.statusText)
          	 	 }
    	 	 	const json = await res.json()
         		 setIsPending(false)
    	 		 setPlaces(json)
    	 		 setError(null)
    	 	 
   	       		 } catch (err) {
   	        	 	  if(err.name ==="AbortError") {
   	         	 		 console.log('the fetch was aborted')}
   	         	 	 else{
   	         	 	 setIsPending(false)
     		  		 setError('Can not find this place')
     		  		 console.log("Can not find this place",err.message)
   	           		}
   		 
            	 		}
       			 } 
        
          
   	fetchD()
   
	}
	
	
	//handle2

const handleSubmitSearchNearbyForm =(e)=>{

	   e.preventDefault();
	  odzyskGeocord()
	  
	 // console.log("przed fetch",latNearby,lonNearby)
	  
	  //setLatNearby(latNearby.replace("%20", " "))
	 // setLonNearby(lonNearby.replace("%20", " "))
	  //fetch2
	  
	   const fetchN = async() => {
	
	   //setGeoloTerm(geoloTerm)
	  //setLatNearby()
	
  odzyskGeocord()
	const url =`https://eu1.locationiq.com/v1/nearby?key=${myMapApiKey}&lat=${latNearby}&lon=${lonNearby}&tag=${tag}&radius=${radius}&format=json&limit=10&normalizeaddress=1` 
	//console.log("przed zamiana",url)

//console.log("po zamianie",url)

  		    
            
           	 setIsPending(true)
    
         	 try {
          	const res = await fetch(url)
          	if(!res.ok) {
          	  throw new Error(res.statusText)
          	  }
    	 	 const json = await res.json()
         	 setIsPending(false)
    	 	 setPlacesNearby(json)
    	 	 setError(null)
    	 	 
   	        } catch (err) {
   	           if(err.name ==="AbortError") {
   	           console.log('the fetch was aborted')}
   	           else{
   	           setIsPending(false)
     		   setError('Can not find any pleaces around')
     		   console.log("Can not find any pleaces around",err.message)
   	           }
   		 
            	 }
       	 } 
        
          
   	fetchN()

	// console.log("geoloterm2",geoloTerm)
	 

}  

const handleResetDestinations =()=>{
setPlaces(null)
}

const handleResetObjectsNearby =()=>{
setPlacesNearby(null)
}
//console.log(places)
return(

<div>

  <div className ="search-list-nav">

 
  <div>
  
   <h2>Destinations</h2>
   
	 <form className="form-destination-search" onSubmit={handleSubmitSearchForm}>
	 	
	 	<label>
 		 	<div>Place</div>
    			<input type="text" 
     			onChange={(e)=>{
     			setPlace(e.target.value)
     			}}
     			value={place}
     		        />
  		</label>
  		
  		 <label>
  			<div>Country</div>
  	  		<select onChange={(e)=>{setCountry(e.target.value)}}>
 			 <option value="pl">Poland</option>
  			<option value="gb">UK</option>
  			<option value="cz">Czech Republic</option>
  			<option value="sk">Slovakia</option>
  			<option value="de">Germany</option>
  			</select>
  	 	</label> 		 
  		 <div>
  		 <br></br>
  		 <button className="button-send">Send</button>
  		 </div>
  	 </form>
          <p></p>
          {error && <p>{error}</p>}
          
          
          
            
            <button onClick={handleResetDestinations}>Remove destinations</button>
     </div>
     
     {/*tu powinno wyswietlac liste destinations*/}
     
     
     

  
  <ul>
   {places && places.map(pls => (
         <li key={pls.place_id}>
         <p>{pls.display_name}</p>
          <span>{pls.lon}</span>
           <span>, </span>
          <span>{pls.lat}</span>
         
         
           <p>
             <CopyToClipboard
             onCopy={onCopy}
             options={{message: 'Coords to copy'}}
             text={[pls.lon, pls.lat]}>
             <button onClick={onClick}>Copy coordinates of this position</button>
            </CopyToClipboard>
          </p>
        </li>
   ))}
   </ul>  
   
    <h2>Objects nearby</h2>
    
     <form className="form-search-nearby" onSubmit={handleSubmitSearchNearbyForm}>
     
      <label>
 	 <div>Geocordinates</div>
    	  <input type="text" 
     	 onChange={(e)=>{setGeoloTerm(e.target.value)}}
     	 value={geoloTerm}
     	 />
  	</label>
  	  	
      <label>
  		<div>Radius</div>
  	  	<select onChange={(e)=>{setRadius(e.target.value)}}>
 		 <option value="100">100m</option>
 		  <option value="500">500m</option>
  		<option value="1000">1km</option>
  		<option value="5000">5km</option>
  		<option value="10000">10km</option>
  		{/*onChange={(e)=>{setRadius(e.target.value)}}*/}
     		 value={radius}
  		</select>
  	</label>
  	  
  	  {/*
  	 <label>
 	 <div>Object to  find</div>
    	  <input type="text"  onChange={(e)=>{setTag(e.target.value)}} 
    	  value={tag}
     	 />
  	</label>
  	*/}
  	   <label>
  		<div>Object 2</div>
  	  	<select onChange={(e)=>{setTag(e.target.value)}}>
 		 <option value="all">all </option>
  		<option value="airport ">airport </option>
  		<option value="atm">atm</option>
  		 <option value="bank">bank</option>
  		<option value="bus_station">bus_station </option>		
  		 <option value="cinema">cinema</option>
  		<option value="pharmacy">pharmacy</option>
  		<option value="fuel">fuel</option>
  		<option value="hospital ">hospital</option>
  		<option value="hotel">hotel</option>
  		<option value="park ">park </option>
  		 <option value="parking ">parking </option>	 
  		<option value="pub">pub</option>
  		<option value="place_of_worship">place_of_worship</option> 		
  		<option value="restaurant">restaurant</option>		
  		 <option value="school ">school</option>
  		<option value="shop">shop</option>
  		<option value="stadium ">stadium </option>
  		<option value="toilet  ">toilet </option>
     		  value={tag}
  		</select>
  	</label>
	
  	 







  	
  	<div>
  	<br></br>
  	<button>Send</button>
  	</div>
  	<br></br>
  	<div>
  
  	</div>
  	
     </form>
        <p></p>
          {error && <p>{error}</p>}
       	<button onClick={handleResetObjectsNearby}>Remove objects</button>   
    <div style={{display: formControlShow ? 'block' : 'none'}}>       
  <p>{geoloTerm}</p>
  <p>In around {radius}m</p>
  <p>{tag}</p>
 </div>


  
    <ul>
   {placesNearby && placesNearby.map(plsNr => (
         <li key={plsNr.place_id}>
         <p>{plsNr.name}</p>
         <p>{plsNr.display_name}</p>
            <span>{plsNr.lon}</span>
            <span>,  </span>
          <span>{plsNr.lat}</span>
          
       
           <p>
             <CopyToClipboard
             onCopy={onCopy}
             options={{message: 'Coords to copy'}}
             text={[plsNr.lon, plsNr.lat]}>
             <button onClick={onClick}>Copy coordinates of this position</button>
            </CopyToClipboard>
          </p>
         
        </li>
   ))}
    
   </ul>
    <button onClick={clearAll}>Clear all searches</button>
    </div>
    
   
   
   
   
</div>
)

}
