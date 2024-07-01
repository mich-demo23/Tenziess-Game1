/* eslint-disable react/prop-types */


export default function Die (props){



    return (
        <div className={props.held ? "die held" : "die"}
        onClick={props.holdDie} >
        
            <h2 className="die-num"  >
            {props.value}
            </h2>
           
        </div>
    )





}