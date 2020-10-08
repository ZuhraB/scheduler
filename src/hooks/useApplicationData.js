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

  const remainingSpots = (state) => {
    const newState = { ...state };
    const days = newState.days.map((day) => {
      const spots = day.appointments.reduce((spots, id) => {
         console.log(`spots inside reduce with day=${day}:`, spots)
        if (newState.appointments[id].interview === null) {
          return spots + 1;
        }
        return spots;
      }, 0);
      return { ...day, spots };
    });
    return days;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    console.log("appointment:", appointment)
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
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    console.log('int:', interview)
    console.log('appoint:',appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8080/api/appointments/${id}`)
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
