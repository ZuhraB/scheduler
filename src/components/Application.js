
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

//returns an array of ids of appointments for each day
const appointments = getAppointmentsForDay(state, state.day);
const schedule = appointments.map((appointment) => {
  //returns an object of student name and interviewer
  const interview = getInterview(state, appointment.interview);
  const interviewers= getInterviewersForDay(state, state.day)
  

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers = {interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});
//books interviews 
 function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      console.log("res", res)
      setState({
        ...state,
        appointments: {
          ...state.appointments,
          [id]: appointment
        }
      });
    })
  }
  //cancel interviews
  function cancelInterview(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`http://localhost:8080/api/appointments${id}`, {interview})
      .then(() => setState ({
        ...state,
        appointments
      }));
      
  }

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
