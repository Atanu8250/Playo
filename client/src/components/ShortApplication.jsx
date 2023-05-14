import React from 'react'
import style from '../styles/Dashboard.module.css';
import { Link } from 'react-router-dom';



// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return `${time} | ${date}`;
}
function ShortApplication({ data }) {
     const { event, status } = data;
     const { _id, title, description, startTime, endTime, state, country } = event;

     return (
          <Link to={`/event/${_id}`}>
               <div className={style.ShortApplication}>
                    <div>
                         <h2>{title}</h2>
                         <h4>{description}</h4>
                         <p><bdi>Start Time:</bdi> {getDateAndTime(startTime)}</p>
                         <p><bdi>End Time:</bdi> {getDateAndTime(endTime)}</p>
                    </div>
                    <div>
                         <p><bdi>Country: </bdi> {country} </p>
                         <p><bdi>State: </bdi> {state} </p>
                         <p style={{ color: `${status === 'accepted' ? '#188d00' : status === 'pending' ? '#f3a600' : '#dc0000'}` }}><bdi>Status: </bdi> {status} </p>
                    </div>
               </div>
          </Link>
     )
}

export default ShortApplication

/*
createdAt : "2023-05-13T05:46:13.788Z"
event : {
     country : "America"
     createdAt : "2023-05-13T05:41:23.196Z"
     description : "hello, description"
     endTime : "2023-05-13T00:00:00.000Z"
     limit : 10
     organisedBy : "645e9eb674ece0b8c7ae082b"
     participants : ["645e9b8dbad603d5a85c404d"]
     startTime : "2023-05-12T00:00:00.000Z"
     state : "Prais"
     title : "try 1 abhishek"
     updatedAt : "2023-05-13T07:48:39.319Z"
     _id : "645f2303b93023ed33254b0b"
}
status : "accepted"
updatedAt : "2023-05-13T06:59:56.240Z"
user : "645e9b8dbad603d5a85c404d"
_id : "645f242560217d0e96ec5c91"
*/ 