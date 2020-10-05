import { useEffect, useState } from "react";
import axios from "axios";
export  function useApplicationData() {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {}
  });
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
  return axios.delete(`http://localhost:8080/api/appointments/${id}`, {interview})
    .then(() => {
      console.log("delete")
      setState ({
      ...state,
      appointments
    })});
    
}


  return { state, setDay, bookInterview, cancelInterview }
}