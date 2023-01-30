import{useState} from 'react'
//import './CoordForm.css'
//import { useForm } from './hooks/useForm'
import useRefresh  from '../hooks/useRefresh'
import useMap  from '../hooks/useMap'
import blueIcon from '../images/blueIcon.png'
//import {useReverseGeocoding} from './hooks/useReverseGeocoding'


export default function CordsForm() {
const [coordsFromForm,setCoordsFromForm] = useState('')

const {refreshPage} = useRefresh()
const {sendFormToMap} = useMap()

//console.log("DATYA",data)

     const handleSubmitForm =(e) =>{
          e.preventDefault();
          setCoordsFromForm(coordsFromForm);
          sendFormToMap();
          
         
         if(coordsFromForm){
             localStorage.setItem('coordsFromForm', JSON.stringify(coordsFromForm))      
                }
         }
         
         
         //fetchFormOnmap();
                
     const handleClickRemFromMap =() =>{
     localStorage.removeItem('coordsFromForm');
     refreshPage();
     
     }           
                
return (
  <div>

      <form className="cords-form" onSubmit={handleSubmitForm}>
        <label>
          <div>Target geocoordinates</div>
          <br></br>
          <input type="text" 
               onChange={(e) =>setCoordsFromForm(e.target.value)}
              value={coordsFromForm}
          />
        </label>
       <button>Send to the map</button>
       <button onClick={handleClickRemFromMap}>Remove from the map</button>
      </form>

   <p>{coordsFromForm}</p>
   
      <span className="bigger-size-letter">Target location </span>
      <span><img src={blueIcon} alt="Current position" height={25} width={15} /></span>
   
     {/*   <p><button onClick={handleResetFormForm}>Clear target location</button></p> */}
        

</div>

)
}
