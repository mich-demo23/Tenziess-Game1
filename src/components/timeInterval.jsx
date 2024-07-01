/* eslint-disable react/prop-types */



export default function TimeInterval(props){




    return(
        <div className="time-stamp">
        <div className="time-stamp-title"> Game Time</div>
        <div className="time-stamp-time">
        {props.time}

        </div>
        </div>
    )
}