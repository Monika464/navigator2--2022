import {useState,useEffect,useCallback} from 'react'
import useTrack from '../hooks/useTrack'
import useFetch from '../hooks/useFetch'
import useMap from '../hooks/useMap'
import useReadStorage from '../hooks/useReadStorage'
import {CopyToClipboard} from 'react-copy-to-clipboard'
 
 //export default function Home({lat,lon,id}) {
export default function Home() {
const [copied, setCopied] = useState(false);
const [currentCoords,setCurrentCoords] = useState ([]);
const [url,setUrl] = useState(null)
const {lat,lon,id,accure} = useTrack()
const {urlMarkMap} = useMap()
const {fromStorage,fetchFromStorage} = useReadStorage()
 const [storageButtonShow, setStorageButtonShow] = useState(false);
 
useEffect(()=>{fetchFromStorage()},[])
//console.log("home-fromsto",fromStorage)

const {data: yourLocation, error: adressError} = useFetch(url)
//console.log(urlMarkMap)

const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 

useEffect(()=>{
if((lat && lon) != 0){  
    setUrl (`https://eu1.locationiq.com/v1/reverse?key=${myMapApiKey}&lat=${lat}&lon=${lon}         &format=json&addressdetails=1&showdistance=1`)
} else{
setUrl(null)
}

},[lat,lon])

const handleSaveCoordToStorage=()=>{
setCurrentCoords(currentCoords);
currentCoords.push({lon: lon,lat: lat, id: Math.round(Math.random() * Date.now()/100000),date: new Date()})

localStorage.setItem('currentCoordsStored', JSON.stringify(currentCoords));
}

//console.log("ze storage",JSON.parse(localStorage.getItem('currentCoordsStored')))
//console.log("TUTAJ",yourLocation,"idpending",adressIsPending,"blad:", adressError)
//console.log("LAT LON",lat,lon)

 const onClick = useCallback(({target: {innerText}}) => {
    console.log(`Clicked on "${innerText}"!`);
  }, [])
  
    const onCopy = useCallback(() => {
    setCopied(true);
  }, [])
 
 
 console.log(lat,lon,id)
 const [isPending,setIsPending]=useState(false)
 
 const handleClickStop=()=>{
 navigator.geolocation.clearWatch(id);
 }
 
 const handleClearStorage=()=>{
 localStorage.clear();
 }

 useEffect(() => {
                
       if(lat&&lon !=0){
       setIsPending(false)
       } 
       else {
       
        setIsPending(true)
       }
    
     },[lat,lon]) 
     
      const handleClickStorageBut = event => {
    // 👇️ toggle visibility
    setStorageButtonShow(current => !current);
  };

return(
<div>


{!isPending&&<div>Latitude,Longitude {lon},{lat} <p>Accuracy {accure} meters</p></div>}
{isPending &&<p>Loading...</p>}
 <p>
        <CopyToClipboard
          onCopy={onCopy}
          options={{message: 'Copy'}}
          text={[lon,lat]}>
          
         <span> <button onClick={onClick}>Copy coordinates of your current position</button></span>
      </CopyToClipboard>
        {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </p>
  <p><button onClick={handleSaveCoordToStorage}>Save current coordinates to personal storage</button></p>     
<button onClick={handleClickStop}>Zakoncz sledzenie</button> 

<h2>Adres twojej pozycji</h2>

 {yourLocation && <p>{yourLocation.address.road},{yourLocation.address.quarter},{yourLocation.address.postcode},  {yourLocation.address.city},{yourLocation.address.state},{yourLocation.address.administrative},{yourLocation.address.country_code} </p>}
 
<img src= {urlMarkMap}/>

{adressError && <p>adressError</p>}
  <p><button onClick={handleClearStorage}>Clear Storage</button></p>  

<button onClick={()=>{handleClickStorageBut()}}>Show/Hide Personal Storage</button>
  
          {/*<button onClick={()=>{handleClickDelEv(event.id)}}>Delete event</button>
            <button onClick={()=>{handleClickLoadMapMarkers(item.id)}}>Load on map</button>*/}
      
  <div style={{display: storageButtonShow ? 'block' : 'none'}}>
  <p>huuuuuuu</p>
        { fromStorage.map((item, index)=>(
     <div key={item.id}>
      <h2>{index}</h2>
      <h2>Longitude,Latitude{item.lon},{item.lat}, date{item.date} </h2>
     </div>
   ))}
      </div> 
  

</div>
)


}
