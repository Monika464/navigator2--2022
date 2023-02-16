import { useTheme } from '../hooks/useTheme'

const Footer = () =>{
const {mode} =useTheme()

   return (
   
    
        <nav className={`footer ${mode}`}>
            <div className ={`search-list-nav ${mode}`}>
            <div className={`links ${mode}`}>
              
                 <span>  Search & Weather powered by <a href="https://locationiq.com/?ref=link-back"> LocationIQ.com</a> </span> 
             
                 <span>  & <a href="https://7timer.info/">7timer.info</a> </span>
                <span> Copyright  &copy; GH 2022</span>
            </div>
              </div>
        </nav>
      
    );

}

export default Footer
