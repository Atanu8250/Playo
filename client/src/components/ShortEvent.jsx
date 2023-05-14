import React, { useCallback, useState } from 'react'
import style from '../styles/Home.module.css';
import Modal from './Modal';
import EventDetails from './EventDetails';


// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return { date, time };
}


function ShortEvent({ event: { _id, title, description, createdAt, limit, participants, country } }) {
     const { date, time } = getDateAndTime(createdAt);

     const showModal = useCallback(() => {
          document.querySelector('dialog').showModal();
     }, [])



     return (
          <>
               <article className={style.Event} onClick={showModal}>
                    <div>
                         <h2>{title}</h2>
                         <h4>{description}</h4>
                    </div>
                    <div>
                         <b><bdi>Country:</bdi> {country}</b>
                         <p>Participants: {participants.length}/{limit}</p>
                         <i>Created at: {time} | {date} </i>
                    </div>
               </article>
               <Modal>
                    <EventDetails id={_id} />
               </Modal>
          </>
     )
}

export default React.memo(ShortEvent);

