import {useState,useEffect,useCallback} from 'react'
import useTrack from '../hooks/useTrack'
import useFetch from '../hooks/useFetch'
import useMap from '../hooks/useMap'
import {CopyToClipboard} from 'react-copy-to-clipboard'
 
 //export default function Home({lat,lon,id}) {
export default function Home() {
const [copied, setCopied] = useState(false);
const [currentCoords,setCurrentCoords] = useState ([]);
const {lat,lon,id,accure} = useTrack()
const {urlMarkMap} = useMap()
const [url,setUrl] = useState(null)


const {data: yourLocation, error: adressError} = useFetch(url)
console.log(urlMarkMap)

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

console.log(JSON.parse(localStorage.getItem('currentCoordsStored')))
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
 

 useEffect(() => {
                
       if(lat&&lon !=0){
       setIsPending(false)
       } 
       else {
       
        setIsPending(true)
       }
    
     },[lat,lon]) 

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

</div>
)


}
