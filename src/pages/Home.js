import {useState,useEffect,useCallback} from 'react'
import useTrack from '../hooks/useTrack'
import useFetch from '../hooks/useFetch'
import {CopyToClipboard} from 'react-copy-to-clipboard'
 
 //export default function Home({lat,lon,id}) {
export default function Home() {
const [copied, setCopied] = useState(false);
const [url,setUrl] = useState(null)
const {lat,lon,id} = useTrack()
const {data: yourLocation, error: adressError } = useFetch(url)
//console.log(yourLocation)

const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 

useEffect(()=>{
if((lat && lon) != 0){  
    setUrl (`https://eu1.locationiq.com/v1/reverse?key=${myMapApiKey}&lat=${lat}&lon=${lon}         &format=json&addressdetails=1&showdistance=1`)
} else{
setUrl(null)
}

},[lat,lon])



//console.log("TUTAJ",yourLocation,"idpending",adressIsPending,"blad:", adressError)
console.log("LAT LON",lat,lon)

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


{!isPending&&<div>Latitude,Longitude {lon},{lat}</div>}
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
      
<button onClick={handleClickStop}>Zakoncz sledzenie</button> 

<h2>Adres twojej pozycji</h2>

 {yourLocation && <p>{yourLocation.address.city},{yourLocation.address.state},{yourLocation.address.quarter},{yourLocation.address.road},{yourLocation.address.postcode},{yourLocation.address.state},{yourLocation.address.administrative},{yourLocation.address.country_code} </p>}
 

{adressError && <p>adressError</p>}

</div>
)


}
