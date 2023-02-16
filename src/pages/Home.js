import './TripList.css'
import {useState,useEffect,useCallback} from 'react'
import useTrack from '../hooks/useTrack'
import useFetch from '../hooks/useFetch'
import useMap from '../hooks/useMap'
import { useTheme } from '../hooks/useTheme'
import useReadStorage from '../hooks/useReadStorage'

import {CopyToClipboard} from 'react-copy-to-clipboard'
 
import useRefresh  from '../hooks/useRefresh'
import blueIcon from '../images/blueIcon.png'
import redIcon from '../images/redIcon.png'
//import {useReverseGeocoding} from './hooks/useReverseGeocoding' 
   
 //export default function Home({lat,lon,id}) {
export default function Home() {


  const {mode} =useTheme()

const [copied, setCopied] = useState(false);
const [storageButtonShow, setStorageButtonShow] = useState(false);
const [currentCoords,setCurrentCoords] = useState([]);
const [wachingPosButOn,setWachingPosButOn] = useState(false);
const [sendToMapButOn, setSendToMapButOn] = useState(false);
const [coordsFromForm,setCoordsFromForm] = useState('')
const [url,setUrl] = useState(null)
const [urlTarget,setUrlTarget]= useState(null)
const[lonForm, setLonForm] = useState(null)
const[latForm, setLatForm] = useState(null)
const [exceededTime,setExceededTime] = useState(false)

//const {lat,lon,id,accure,handleButWatchPos} = useTrack()
const {lat,lon,id,accure,fetchPosition} = useTrack()
const {urlMarkMap,handleClickLoadTargetMark,handleClickRemoveTargetMark,loadMap,formToMap,lonFrSto,latFrSto,sendToMapButStorOn} = useMap()
const {fromStorage,fetchFromStorage} = useReadStorage()
 const {refreshPage} = useRefresh()

//const{refreshPage} = useRefresh()

//console.log("cords z formularza",coordsFromForm);

 const handleSaveCoordToStorage=()=>{
//tu cos przestawilam
currentCoords.push({lon: lon,lat: lat, id: Math.round(Math.random() * Date.now()/100000),date: new Date()})
setCurrentCoords(currentCoords);
localStorage.setItem('currentCoordsStored', JSON.stringify(currentCoords));
}
 
 //const handleClickLoadTargetMark =(e)=>{
 //console.log(e.lon,e.lat)
  //}
  

 
  //console.log("coords",coords)
 
const {data: yourLocation, error: adressError} = useFetch(url)
//console.log(urlMarkMap)
const {data: yourTargetLocation, error: targetAdressError} = useFetch(urlTarget)

const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 


useEffect(()=>{

if(wachingPosButOn){
  if((lat && lon) !== 0){  
    setUrl (`https://eu1.locationiq.com/v1/reverse?key=${myMapApiKey}&lat=${lat}&lon=${lon}         &format=json&addressdetails=1&showdistance=1`)
      loadMap(lat,lon);
  } else{
  setUrl(null)
  }
}
else {
console.log("Włacz sledzenie")
}

if(sendToMapButOn){
 setUrlTarget (`https://eu1.locationiq.com/v1/reverse?key=${myMapApiKey}&lat=${latForm}&lon=${lonForm}         &format=json&addressdetails=1&showdistance=1`)
}
if((lonFrSto && latFrSto)!== 0)
{
 setUrlTarget (`https://eu1.locationiq.com/v1/reverse?key=${myMapApiKey}&lat=${latFrSto}&lon=${lonFrSto}         &format=json&addressdetails=1&showdistance=1`)
}

},[lat,lon,wachingPosButOn,loadMap,latForm,lonForm,sendToMapButOn,latFrSto,lonFrSto])



//useEffect(()=>{fetchFromStorage()},[currentCoords,fetchFromStorage])




 const onClick = useCallback(({target: {innerText}}) => {
    console.log(`Clicked on "${innerText}"!`);
  }, [])
  
    const onCopy = useCallback(() => {
    setCopied(true);
  }, [])
 
 
 //console.log(lat,lon,id)
 const [isPending,setIsPending]=useState(false)
 
 const handleClickStop=()=>{
 navigator.geolocation.clearWatch(id);
 console.log("watching position stopped")
 setWachingPosButOn(false)
 }
 
 const handleClearStorage=()=>{
 localStorage.clear();
 }


 useEffect(() => {
 
       if(setWachingPosButOn) {
                
                if(lat&&lon !==0){
                  setIsPending(false)
                } 
                else {
              setIsPending(true)
              }
          }
     },[lat,lon]) 
    

     
      const handleClickStorageBut = event => {
    // 👇️ toggle visibility
    fetchFromStorage();
    setStorageButtonShow(current => !current);
  };
  
  


//formularz targetloction coords connected wirh send

     const handleSubmitForm =(e) =>{
          e.preventDefault();
      

                            setLonForm(coordsFromForm.split(",")[0])
                             setLatForm(coordsFromForm.split(",")[1])
                           console.log("LonForm Latfor -home",lonForm,latForm);
          //sendFormToMap();
          setSendToMapButOn(true)
         formToMap(latForm,lonForm)
      
         }
         
         
         //fetchFormOnmap();
                
     const handleClickRemFromMap =() =>{
    // localStorage.removeItem('coordsFromForm');
     //refreshPage();
     setSendToMapButOn(false);
     setLonForm(lon);
     setLatForm(lat);
     
     }  
     
     const handleClickDel=()=>{
   
     }
   
       setTimeout(function () {
             navigator.geolocation.clearWatch(id)
             setExceededTime(true)
             console.log("Watching stopped due to exceedet time. Start again");
             setWachingPosButOn(false)
             }, 100000);

return(

 <div className ={`search-list-nav ${mode}`}>
{!wachingPosButOn && <div style={{color: "#f1356d", fontWeight:"900"}}>Connect geolocation and enable localisation on your device</div>}
<br/>
{exceededTime && !wachingPosButOn && <div style={{color: "#f1356d", fontWeight:"900"}}>Watching stopped due to exceedet time. Start again</div>}
<br></br>
{/*sledzenie*/}
{!wachingPosButOn  &&
  <span> <button onClick={()=>{
  setWachingPosButOn(true)
  fetchPosition();
  fetchFromStorage();
  //handleClickWatchPosition()
  }}>Connect geolocation</button></span>}
  
  {wachingPosButOn  &&<span><button onClick={handleClickStop}>Disconnect geolocation</button></span>}
<br></br>
{/*geocoords*/}
<br></br>
{!isPending&&  <div>Latitude,Longitude {lon},{lat} <p>Accuracy {accure} meters</p></div>}
{isPending && wachingPosButOn && <p>Searching for GPS signal...</p>}
 
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



  
  <div>
  <br></br>
      <form className="cords-form" onSubmit={handleSubmitForm}>
        
        <label>
          <div>Target location geocoordinates (Lat,Lon)</div>
          <br></br>
          <input type="text" 
               onChange={(e) =>setCoordsFromForm(e.target.value)}
              value={coordsFromForm}   
          />
        </label>
       <button>Send to the map</button>
       <button onClick={handleClickRemFromMap}>Remove from the map</button>
      </form>
  </div>
   <p>{coordsFromForm}</p>
   
  { (sendToMapButOn || sendToMapButStorOn)   && <div>
      <span className={`bigger-size-letter ${mode}`}>Target location </span>
      <span><img src={redIcon} alt="Current position" height={25} width={15} /></span>
    <span> {yourTargetLocation &&  <p>{yourTargetLocation.address.road},{yourTargetLocation.address.quarter},{yourTargetLocation.address.postcode},{yourTargetLocation.address.city},{yourTargetLocation.address.state},{yourTargetLocation.address.administrative},{yourTargetLocation.address.country_code} </p>}</span>
   
     {/*   <p><button onClick={handleResetFormForm}>Clear target location</button></p> */}
   </div>  }   
 
 
 

<span className={`bigger-size-letter ${mode}`}>Your position address</span>
     <span><img src={blueIcon} alt="Target position" height={25} width={15} /></span>

 {yourLocation && <p>{yourLocation.address.road},{yourLocation.address.quarter},{yourLocation.address.postcode},{yourLocation.address.city},{yourLocation.address.state},{yourLocation.address.administrative},{yourLocation.address.country_code} </p>}

 
 {!isPending &&<img src= {urlMarkMap} alt="map"/>}

{adressError && <p>Could not fetch address</p>}
  <p><button onClick={handleClearStorage}>Clear Storage</button></p>  

<button onClick={()=>{handleClickStorageBut()}}>Show/Hide Personal Storage</button>
  
          {/*<button onClick={()=>{handleClickDelEv(event.id)}}>Delete event</button>
            <button onClick={()=>{handleClickLoadMapMarkers(item.id)}}>Load on map</button>*/}
      
  <div style={{display: storageButtonShow ? 'block' : 'none'}}>
 <ul>
      {fromStorage && fromStorage.map((item, index)=>(
 
        <li key={item.id} > 
         <p>{index}-Lat,Lon{item.lon},{item.lat}, Date{item.date} </p>
         <button onClick={(e)=>{handleClickLoadTargetMark(item)}}>Load on the map</button>
         <button onClick={handleClickRemoveTargetMark}>Remove from the map</button>
         {/*<button onClick={()=>{handleClickDel(event.id)}}>Delete form storaget</button>*/}
        </li>
      
      ))}
  </ul>   
  </div> 
  

</div>

)


}
