
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList"
import "components/Application.scss";
import InterviewerList from 'components/InterviewerList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
  "2": {
    "id": 2,
    "time": "1pm",
    "interview": {
      "student": "Archie Cohen",
      "interviewer": 2
    }
  }
}
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const dailyAppointments = [];

  const setDays = (days) => {
      setState({...state,days})
}

  const setDay = (day) => {
      setState({...state,day})
}
  useEffect(() => {
    const url = '/api/days'
    axios.get(url).then(response => {
      setDays(response.data)
  })
}, [])
Promise.all([
  axios.get('/api/days'),
  axios.get('/api/appointments'),
  axios.get('/api/interviewers')
]).then(response => {
setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }));
},[])

// const appointments = getAppointmentsForDay(state, day);

// const schedule = appointments.map((appointment) => {
//   const interview = getInterview(state, appointment.interview);

//   return (
//     <Appointment
//       key={appointment.id}
//       id={appointment.id}
//       time={appointment.time}
//       interview={interview}
//     />
//   );
// });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav > <DayList
  
   days={state.days} day={state.day} setDay={setDay} />
   </nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
       {appointments.map(appointment => {
          return(
            <Appointment key={appointment.id} {...appointment} />
          )
})}
      </section>
    </main>
  );
}

