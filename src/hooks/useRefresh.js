 export default function useRefresh(){
 
  function refreshPage(){
      window.location.reload(true);
  }
  
  return {refreshPage}
  
  }
