import { useTheme } from "../hooks/useTheme"
import modeIcon from '../images/mode-icon.svg'
// styles
import './ThemeSelector.css'


export default function ThemeSelector() {
  const { changeMode,mode } = useTheme()
  
  
  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }
  console.log(mode)


  return (
    <span className="theme-selector">
      
       <span className="mode-toggle">
        <img 
          onClick={toggleMode}
          src={modeIcon}
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
          alt="dark/light toggle icon"
        />
      </span> 
      
 </span>
  )
}
