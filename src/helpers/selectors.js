import { stat } from "fs";

export function getAppointmentsForDay(state, day) {
  const daysInDay = state.days.map(day => day.name);
  const daysIncluded = daysInDay.includes(day)
  if (!day || !daysIncluded)
  return [];
    return  state.days
       .filter(appointment => appointment.name === day)[0]
       .appointments.map(apptId => state.appointments[apptId]); 
}