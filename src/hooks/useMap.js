import {useState} from 'react'
import useTrack from './useTrack'
import useReadStorage from './useReadStorage'

export default function useMap () {
const [urlMarkMap,setUrlMarkMap] = useState(null)
const {lat,lon} = useTrack()
const [lonFrSto,setLonFrSto] = useState(lon)
const [latFrSto,setLatFrSto] = useState(lat)
//const[lonForm, setLonForm] = useState(null)
//const[latForm, setLatForm] = useState(null)
//const [coordsFromForm,setCoordsFromForm] = useState("")

const {lonForm,latForm} = useReadStorage()

//console.log("coordsFromForm in map",coordsFromForm)

   

    //fetchPosition() 
console.log("z useMap dane z Forma" ,lonFrSto,latFrSto)
console.log("z useMap dane z Forma" ,lonForm,latForm)

console.log("z useMap dana z tracking" ,lat,lon)

const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 

/*
const handleClickWatchPosition =()=>{
fetchPosition();
console.log("USEMAP",lat,lon);

}
*/
/*
useEffect(()=>{
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  
     if(key === "coordsFromForm"){
     console.log("mmamy coordsFromForm",key)
     let dataStor = JSON.parse(localStorage.getItem('coordsFromForm'))
      setCoordsFromForm(dataStor)
       } 
   }
   
 if(coordsFromForm){
  console.log("coordsFor-useMap",coordsFromForm.split(","),"yuyii")
  setLonForm(coordsFromForm.split(",")[0])
  setLatForm(coordsFromForm.split(",")[1])
  }
  
    console.log("LonForm Latfor -useMap",lonForm,latForm);
    
 
},[localStorage.length>0,coordsFromForm,lonForm,latForm])
 //console.log("coordsFor",coordsFromForm.split(","),"yuyii")
 //const splitCords = coordsFromForm.split(",");
 //console.log("tttytu",splitCords)
  //console.log("rrrr",splitCords[0])
  
  
  useEffect(()=>{
  if(coordsFromForm){
  console.log("coordsFor",coordsFromForm.split(","),"yuyii")
  setLonForm(coordsFromForm.split(",")[0])
  setLatForm(coordsFromForm.split(",")[1])
  }
  },[coordsFromForm])
 */
const handleClickLoadTargetMark =(e)=>{

  console.log(e.lat, e.lon)
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

   const sendFormToMap =()=>{ 
   	if((lonForm&& latForm)!==0 && (lon&& lat)!==0){
   	setLatFrSto(latForm);
   	setLonFrSto(lonForm);
    	
   	}}
  


const loadMap =(latx,lonx)=>{

   if((lonFrSto && latFrSto)=== 0){
             setLatFrSto(latx)
            setLonFrSto(lonx)
      }
 
   
   setUrlMarkMap (`https://maps.locationiq.com/v3/staticmap?key=${myMapApiKey}&size=600x600&zoom=14&markers=icon:tiny-red-cutout|${latFrSto},${lonFrSto}&markers=icon:tiny-blue-cutout||${latx},${lonx}`)
   
}


return {urlMarkMap,handleClickLoadTargetMark,handleClickRemoveTargetMark,sendFormToMap,loadMap}

}
