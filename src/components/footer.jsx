/* eslint-disable react/prop-types */


import '../App.css'

import instagram from '../assets/instagram-logo-bold.svg'
import github from '../assets/github-logo-bold.svg'
import twitter from '../assets/twitter-logo-bold.svg'
import mail from '../assets/envelope-bold.svg'



function Footer (props){

    return (
        <>
        <footer className={props.darkmode?"footer dark" : 'footer'} id='footer'>
            
            <div className='footer-main'>
            <span>
            <a href="mailto:michaelamao442@gmail.com"> 
                <img src={mail} className="footer-logo"/> 
            </a>
            <a href='https://www.instagram.com/_sore.funmi?igsh=MWhzeXJsZTM4cWJ5dg==' target='_blank'>
                <img src={instagram} className='footer-logo'/>
            </a>
            <a href='https://github.com/mich-demo23' target='_blank'>
                <img src={github} className='footer-logo' />
            </a>
            <a href='https://x.com/only_migel?t=_pjw7j26CYYi_PBbqblVfA&s=09' target='_blank'>
                <img src={twitter} className='footer-logo' /> 
            </a>
            </span>
          <small>&copy; 2024 TiredDev Development. All rights reserved.</small>
          </div>
        </footer>
        </>
    )
}

export default Footer