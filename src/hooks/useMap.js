import {useState,useEffect} from 'react'
import useTrack from './useTrack'
import useReadStorage from './useReadStorage'

export default function useMap(){
const [urlMarkMap,setUrlMarkMap] = useState(null)
const {lat,lon} = useTrack()
const [lonFrSto,setLonFrSto] = useState(null)
const [latFrSto,setLatFrSto] = useState(null)
//const[lonForm, setLonForm] = useState(null)
//const[latForm, setLatForm] = useState(null)
//const [coordsFromForm,setCoordsFromForm] = useState("")
const [sendToMapButOn,setSendToMapButOn] = useState(false)

const {lonForm,latForm} = useReadStorage()

//console.log("coordsFromForm in map",coordsFromForm)

   

    //fetchPosition() 


const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 

useEffect(()=>{
if(sendToMapButOn){
//console.log("z useMap dana z tracking sendToMapButOn" ,lat,lon)
}


},[sendToMapButOn,lat,lon])

const handleClickLoadTargetMark =(e)=>{

  //console.log(e.lat, e.lon)
  const newLat = e.lat;
  const newLon = e.lon;
  setLatFrSto(newLat)
  setLonFrSto(newLon)
  console.log("ustawione",latFrSto, lonFrSto)
 }

const handleClickRemoveTargetMark =()=>{
   
    setLatFrSto(lat)
    setLonFrSto(lon)
    
}
/*
const fetchFormOnmap=()=>{
if((lonForm&& latForm)!==0 && (lon&& lat)!==0){
   setLatFrSto(latForm);
   setLonFrSto(lonForm)
   }
}
*/
/*
const sendFormToMap =()=>{ 
   	if((lonForm&& latForm)!==0 && (lon&& lat)!==0){
   	setLatFrSto(latForm);
   	setLonFrSto(lonForm);
    	
   	}}
  */

const formToMap =(latf,lonf)=>{
setLatFrSto(latf);
setLonFrSto(lonf);
}

const loadMap =(latx,lonx)=>{

   if((lonFrSto && latFrSto)=== 0){
             setLatFrSto(latx)
            setLonFrSto(lonx)
      }
 
   
   setUrlMarkMap (`https://maps.locationiq.com/v3/staticmap?key=${myMapApiKey}&size=600x600&zoom=14&markers=icon:tiny-red-cutout|${latFrSto},${lonFrSto}&markers=icon:tiny-blue-cutout||${latx},${lonx}`)
   
}


return {urlMarkMap,handleClickLoadTargetMark,handleClickRemoveTargetMark,loadMap,setSendToMapButOn,formToMap,lonFrSto,latFrSto}

}
