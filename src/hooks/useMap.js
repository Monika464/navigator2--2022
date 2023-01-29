import {useState,useEffect} from 'react'
import useTrack from './useTrack'


export default function useMap () {
const [urlMarkMap,setUrlMarkMap] = useState(null)
const {lat,lon,fetchPosition} = useTrack()
const [lonFrSto,setLonFrSto] = useState(lon)
const [latFrSto,setLatFrSto] = useState(lat)

console.log("ii",lonFrSto,latFrSto)
console.log("uuuu",lon,lat)

    //fetchPosition() 


const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 

const handleClickWatchPosition =()=>{
fetchPosition();
console.log("USEMAP",lat,lon);
}


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

useEffect(()=>{

   if((lonFrSto && latFrSto)=== 0){
             setLatFrSto(lat)
            setLonFrSto(lon)}
   
   setUrlMarkMap (`https://maps.locationiq.com/v3/staticmap?key=${myMapApiKey}&size=600x600&zoom=14&markers=icon:tiny-red-cutout|${latFrSto},${lonFrSto}&markers=icon:tiny-blue-cutout||${lat},${lon}`)
},[lat,lon,latFrSto,lonFrSto])


return {urlMarkMap,handleClickLoadTargetMark,handleClickRemoveTargetMark,handleClickWatchPosition }

}
