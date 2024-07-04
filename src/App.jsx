/* eslint-disable react/prop-types */
//Tenzies game


import Navbar from './components/navbar'
import Footer from './components/footer'
import Die from './components/die'
import Confetti from 'react-confetti'
import './App.css'
import {nanoid} from 'nanoid'
import { useEffect, useRef, useState } from 'react'
import TimeInterval from './components/timeInterval'

function App() {

  
  
  const [dice, setDice] = useState( allNewDice() )
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [plays, setPlays ] = useState(0)
  const[ seconds, setSeconds] = useState(0)
  const [bestTime, setBestTime] = useState(
  
      JSON.parse(sessionStorage.getItem('bestTime')) || "No record"
    ) 
  
  const allHeldVal = useRef(false)
  const allSameValueVal = useRef(false)

  useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value

    const allSameValue = dice.every(die => die.value === firstValue)

    //pass values of allHeld and firstValue out of the function
    allHeldVal.current = allHeld
    allSameValueVal.current = allSameValue
    
    if(allHeld && allSameValue){
      setTenzies(true)
          
      sessionStorage.setItem("bestTime", JSON.stringify(time))
        // localStorage.setItem("bestTime", JSON.stringify(time))
        if(time < bestTime){
          setBestTime(time)
        }
    }
    

    
  }, [dice])
  
  //Dice numbers generation
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
      window.addEventListener('resize', watchWidth
       )

       function watchWidth () {
         setWindowWidth(window.innerWidth)
         
        }
        return () =>{
          removeEventListener('resize', watchWidth)
          console.log("clean")
        }
        
      }, [windowWidth])
      
      function allNewDice (){
        
        let width = window.innerWidth
        let num =  width > 512 ? 10  : 12
    
    const dienum = []
      for(let i = 0; i < num; i++){
          dienum.push(
           generateNewDie()
        )
      }
      
      
      return (dienum)
    }
    
    function generateNewDie() {
        return {
          value : Math.ceil((Math.random() * 6) ),
          isHeld : false,
          id :nanoid()
        }
      }
      

    //Dice roll 

    function rollDice(){
  console.log(bestTime)

        
      setDice(oldDice =>oldDice.map(die => {
        return die.isHeld ?
                    die: generateNewDie()
                  }))
        // localStorage.setItem("bestTime", JSON.stringify(time))
        // sessionStorage.setItem("bestTime", JSON.stringify(time))
                  // console.log(bestTime)

                  
                  // reinitializes states
                  if(allHeldVal.current === true && allSameValueVal.current === true){
                     setDice(allNewDice())
                     setTenzies(false)
                     setSeconds(0)
                     setRolls(0)
                     setPlays(plays + 1)

                  }   else  {
                        setRolls(roll => roll + 1)
                              } 
        }

    //Die component render
  const dieRoll = dice.map(die => <Die
          key = {die.id}
          id={die.id}
         value={die.value}
          held = {die.isHeld}
          holdDie = {() => holdDie(die.id)}
          /> )
    
    //Freeze Dice

    function holdDie(id){
         setDice(oldDice => oldDice.map(die => {
          return die.id === id? 
          { ...die, isHeld : !die.isHeld } :  die
         }) )
    }


    //Time Stamp
    useEffect(() => {
      const intervalId = setInterval(() => {
        if(!tenzies){
            setSeconds(seconds + 1)
        }  
            }, 1000)
            return () => clearInterval(intervalId)
        }, [seconds,tenzies, setSeconds])
    
        
  const hours = ((Math.floor(seconds / 3600)).toString().padStart(2,'0') )
  const minutes = (Math.floor((seconds % 3600) / 60).toString().padStart(2,'0') )
  const secondsElapsed = (((seconds ) % 60).toString().padStart(2,'0') )  

  const time = hours +" : " + minutes +" : " +  secondsElapsed


  //reset game
  function toggleReset(){
    setBestTime("No record")
    setSeconds(0)
    setDice(allNewDice())
    setTenzies(false)
    setRolls(0)
    sessionStorage.setItem('bestTime', JSON.stringify(0))
    setPlays(0)
    
  }

  return (
      <div className='container'>
      <div>

      <Navbar />
      </div>
      
    <main className='tenzies'>
          {tenzies && <div><Confetti
          width={windowWidth-70}
          height={850} 
          numberOfPieces={600}
          colors={['#ff0000', '#f7d600', '#00ff00', '#3709d1' ]}

          />
          </div>}
        <div className='game'>

          <h1 className='title'>Tenzies</h1>
          <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          
          <div className='dice-container'>
              {dieRoll}
          </div>

          <button 
              onClick={rollDice}
              className={tenzies? 'roll-dice new' : 'roll-dice'}>
            {tenzies? "New Game" : "Roll"}
          </button>

        </div>
          
          <div className='aside'>
          <TimeInterval  
            tenzies = {tenzies}
            seconds = {seconds}
            setSeconds = {setSeconds}
            time = {time}
            
          /> 
          <table className='stats'>
            <caption className='table-title'>Stats</caption>
          <tbody>
          <tr>
          <td  className='table-left'>
          <div className='rolls-stamp'>Rolls </div>
          </td>
          <td className='table-right'>{rolls}</td>
          </tr>

          <tr><td className='table-left'>
          <div className='best-time-stamp'>Best Time  </div>  
          </td>
          <td className='table-right'>{bestTime}</td>
          </tr>

          <tr><td  className='table-left'>
          <div className='plays-in-a-row-stamp'>Plays in a row</div>
          </td>
          <td className='table-right'>{plays}</td></tr> 

           </tbody> 
          </table>
          </div>

          <button className='reset' onClick={toggleReset}>Reset</button>
    </main>

    <Footer />

    </div>

)
  
  }
  
  export default App
