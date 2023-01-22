
 
 export default function Home({lat,lon,isPending}) {
 console.log(lat,lon)

return(
<div>
{!isPending&&
<div>Latitude {lat}, Longitude {lon}</div>
}
{isPending &&<p>Loading...</p>}

</div>
)

}
