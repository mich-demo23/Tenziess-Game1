/* eslint-disable react/prop-types */
import reactlogo from '../assets/react.svg'
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg';
import '../App.css'

function Navbar(props){

    let width = window.innerWidth
    if(width > 1000 ){
        width = true
    }
    else {
        width = false
    }
        
        return (
            <>
            <div className={props.darkmode? "navbar dark" : 'navbar'}>
                
     
                <div className='navbar-title'>
                <img src={reactlogo} className='navbar-icon'/>
                <p className='navbar-title-text'>TiredDev</p>
                </div>

                <div className='navbar-mode'>
{/*                  
                <img className='navbar-mode-icon .bounce' 
                    src={props.darkmode ? sun : moon} 
                    onClick={props.toggle}
                />   */}
                   

                </div>

            </div>
        </>
    )
}

export default Navbar