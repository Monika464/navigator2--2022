import {useState, useEffect} from "react"


export default function useFetch (url) {
const [data, setData] = useState(null)
const [isPending,setIsPending]=useState(false)
const [error,setError] = useState(null)

  useEffect(() => {
  
  const fetchData = async() => {
         
            setIsPending(true)
    
         	 try {
          	const res = await fetch(url)
          	if(!res.ok) {
          	  throw new Error(res.statusText)
          	  }
    	 	 const json = await res.json()
         	 setIsPending(false)
    	 	 setData(json)
    	 	 setError(null)
    	 	 
   	        } catch (err) {
   	           if(err.name ==="AbortError") {
   	           console.log('the fetch was aborted')}
   	           else{
   	           setIsPending(false)
     		   setError('Could not fetch the data')
     		   //console.log("tu blad",err.message)
   	           }
   		 
             }
        } 
        
          
   fetchData()
   },[url])
   
     
return {data,isPending,error}

}


