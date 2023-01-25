import {useState,useEffect,useCallback} from 'react'

export default function useReadStorage () {
const [fromStorage,setFromStorage] = useState([])

const fetchFromStorage =  async () =>{	 
   	if (localStorage.length>0){
   	console.log("hej ho")
   	   //await setLon2(JSON.parse(localStorage.getItem('LonForm')))
   	  // await setLat2(JSON.parse(localStorage.getItem('LatForm')))
   	  let dataStor = JSON.parse(localStorage.getItem('currentCoordsStored'))
   	  await setFromStorage(dataStor)  	   
        } 
    

}

 console.log("w storage",fromStorage)


return {fetchFromStorage,fromStorage}
}
