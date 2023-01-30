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
    		 if(key === 'coordsFromForm'){
               		        console.log('coordsFromForm')
     			        let dataStor = JSON.parse(localStorage.getItem('coordsFromForm'))
      				setCoordsFromForm(dataStor)
      			
                             console.log("coordsFor-useReadStorage",coordsFromForm.split(","),"yuyii")
                            setLonForm(coordsFromForm.split(",")[0])
                             setLatForm(coordsFromForm.split(",")[1])
                           console.log("LonForm Latfor -useMap",lonForm,latForm);
                    }	
                 if (key === 'currentCoordsStored'){
                               console.log('currentCoordsStored')
                               let dataStor = JSON.parse(localStorage.getItem('currentCoordsStored'))
   	                   setFromStorage(dataStor) 
                               } 
            } 
         }
         
         /* if(coordsFromForm){
  console.log("coordsFor-useMap",coordsFromForm.split(","),"yuyii")
  setLonForm(coordsFromForm.split(",")[0])
  setLatForm(coordsFromForm.split(",")[1])
  } */
  
    console.log("LonForm Latfor Read-St",lonForm,latForm);
         //useEffect(()=>{fetchFromStorage()},[])

 console.log("w storage -useStorage",fromStorage)
 }

return {fetchFromStorage,fromStorage,lonForm,latForm}
}
