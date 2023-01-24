import {useState,useEffect,useCallback} from 'react'
import useTrack from './useTrack'

export default function Map () {
const [urlMarkMap,setUrlMarkMap] = useState(null)
const {lat,lon} = useTrack()
const myMapApiKey = "pk.4445013492f295d88e56ecea546a9304"; 
useEffect(()=>{
   setUrlMarkMap (`https://maps.locationiq.com/v3/staticmap?key=${myMapApiKey}&size=600x600&zoom=14&markers=icon:tiny-red-cutout|${lat},${lon}&markers=icon:tiny-blue-cutout||${lat},${lon}`)
},[lat,lon])

	
return {urlMarkMap}

}
