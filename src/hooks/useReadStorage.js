import {useState} from 'react'

export default function useReadStorage () {
const [fromStorage,setFromStorage] = useState([])
const [coordsFromForm,setCoordsFromForm] = useState('')
const[lonForm, setLonForm] = useState(null)
const[latForm, setLatForm] = useState(null)

const fetchFromStorage = () =>{


	if (localStorage.length>0){

               for (let i = 0; i < localStorage.length; i++) {
  			   const key = localStorage.key(i)
    	
                 if (key === 'currentCoordsStored'){
                               console.log('currentCoordsStored')
                               let dataStor = JSON.parse(localStorage.getItem('currentCoordsStored'))
   	                   setFromStorage(dataStor) 
                  } 
                  //console.log("key",key)
            } 
         }
         
  }

return {fetchFromStorage,fromStorage,lonForm,latForm}
}
