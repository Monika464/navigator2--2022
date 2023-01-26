import {useState} from 'react'

export default function useReadStorage () {
const [fromStorage,setFromStorage] = useState([])

const fetchFromStorage =   () =>{
	 
   	if (localStorage.length>0){
      	 let dataStor = JSON.parse(localStorage.getItem('currentCoordsStored'))
   	  setFromStorage(dataStor) 
   	  //console.log("w storage",JSON.parse(localStorage.getItem('currentCoordsStored')))
   	
   		  	   
        } 
}

 console.log("w storage",fromStorage)
 

return {fetchFromStorage,fromStorage}
}
