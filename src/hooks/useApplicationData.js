import { useEffect, useState } from "react";
import axios from "axios";
export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => {
    setState({ ...state, day });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);
// updates remaining spots without having to to refresh 
  const remainingSpots = (state) => {
    const newState = { ...state };
    const days = newState.days.map((day) => {
      const spots = day.appointments.reduce((spots, id) => {
        if (newState.appointments[id].interview === null) {
          return spots + 1;
        }
        return spots;
      }, 0);
      return { ...day, spots };
    });
    return days;
  };
// givent an id and an interview creats the interview object 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({
        ...prev,
        appointments: {
          ...prev.appointments,
          [id]: appointment,
        },
      }));

      setState((prev) => ({
        ...prev,
        days: remainingSpots(prev),
      }));
    });
  }
  //given an appoitment id and an interview object cancels the interveiw in the appointment state
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    
    
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
        setState((prev) => ({
          ...prev,
          days: remainingSpots(prev),
        }));
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
