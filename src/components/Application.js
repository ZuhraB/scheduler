
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList"
import "components/Application.scss";
import InterviewerList from 'components/InterviewerList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {}
  });
  const dailyAppointments = [];


  const setDay = (day) => {
      setState({...state,day})
}
useEffect(() => {
Promise.all([
  axios.get('/api/days'),
  axios.get('/api/appointments'),
  axios.get('/api/interviewers')
])
.then(response => {
setState(prev => ({
  ...prev,
  days: response[0].data,
  appointments: response[1].data,
  interviewers: response[2].data
}));
})
}, [])
console.log("interviewers", state.interviewers)

const appointments = getAppointmentsForDay(state, state.day);
console.log("appoitments",appointments)
const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers= getInterviewersForDay(state, state.day)

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers = {interviewers}
    />
  );
});


  return (
    <main className="layout">
      <section className="sidebar">
      <img
      className="sidebar--centered"
       src="images/logo.png"
       alt="Interview Scheduler"
    />
  <hr className="sidebar__separator   sidebar--centered" />
  <nav className="sidebar__menu"> 

    <DayList
     days={state.days}
     day={state.day}
     setDay={setDay} />

   </nav>
   
   <img
    className="sidebar__lhl sidebar--centered"
    src="images/lhl.png"
    alt="Lighthouse Labs"
  />
  </section>

  <section className="schedule">
    {schedule}
    < Appointment key="last" time="5pm" />
  </section>
</main>
  );
}
