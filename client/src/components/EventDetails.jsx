import React, { useCallback, useEffect, useState } from 'react'
import style from '../styles/Home.module.css';


// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return `${time} | ${date}`;
}


function EventDetails({ id }) {
     console.log('id:', id)
     const [details, setDetails] = useState("")
     console.log('details:', details)

     const getDetails = useCallback(async () => {
          try {
               const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/event/${id}`, {
                    headers: {
                         'Content-Type': 'application/json',
                         'authorization': sessionStorage.getItem("TOKEN")
                    }
               })

               const data = await res.json();

               if (res.ok) {
                    console.log('event deatails', data.data)
                    setDetails(data.data);
               } else {
                    alert(data.message);
               }
          } catch (error) {
               console.log('error:', error)
          }
     }, [id])

     useEffect(() => {
          getDetails();
     }, [])


     return (
          <article className={style.ModalEventDetails}>
               <table>
                    <tbody>
                         <tr>
                              <th>Title</th>
                              <td>{details?.title}</td>
                         </tr>
                         <tr>
                              <th>Description</th>
                              <td>{details?.description}</td>
                         </tr>
                         <tr>
                              <th>State</th>
                              <td>{details?.state}</td>
                         </tr>
                         <tr>
                              <th>Country</th>
                              <td>{details?.country}</td>
                         </tr>
                         <tr>
                              <th>Vacancy</th>
                              <td>{details?.limit - details?.participants?.length}</td>
                         </tr>
                         <tr>
                              <th>Limit</th>
                              <td>{details?.limit}</td>
                         </tr>
                         <tr>
                              <th>Organised by</th>
                              <td>{details?.organisedBy?.username}</td>
                         </tr>
                         <tr>
                              <th>Participants</th>
                              <td>{details?.participants?.map(el => <span key={el._id}>{el.username}</span>)}</td>
                         </tr>
                         <tr>
                              <th>StartTime</th>
                              <td>{getDateAndTime(details?.startTime)}</td>
                         </tr>
                         <tr>
                              <th>EndTime</th>
                              <td>{getDateAndTime(details?.endTime)}</td>
                         </tr>
                         <tr>
                              <th>CreatedAt</th>
                              <td>{getDateAndTime(details?.createdAt)}</td>
                         </tr>
                    </tbody>
               </table>
               <button>Apply to the event</button>
          </article>
     )
}

export default EventDetails
/*
country : "America"
createdAt : "2023-05-13T05:41:23.196Z"
description : "hello, description"
endTime : "2023-05-13T00:00:00.000Z"
limit : 10
organisedBy : "645e9eb674ece0b8c7ae082b"
participants : [{_id : '645e9b8dbad603d5a85c404d', username : 'atanu', createdAt : '2023-05-12T20:03:25.709Z', updatedAt : 2023-05-12T20:03:25.709Z'} ]
length : 1
[[Prototype]] : Array(0)
startTime : "2023-05-12T00:00:00.000Z"
state : "Prais"
title : "try 1 abhishek"
updatedAt : "2023-05-13T07:48:39.319Z"
_id : "645f2303b93023ed33254b0b"
*/ 