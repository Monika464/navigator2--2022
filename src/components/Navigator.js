
import { useTrack } from '../hooks/useTrack'

 export default function Navigator() {
 console.log("cz konsola navigator")
const {fetchPosition} = useTrack()
console.log(fetchPosition)
return(
<div className="Navigator-Home">
<p></p>
<p></p>
<p>hej</p>

</div>
)

}


