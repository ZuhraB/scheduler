//import { stat } from "fs";

export function getAppointmentsForDay(state, day) {
  const daysInDay = state.days.map(day => day.name);
  const daysIncluded = daysInDay.includes(day)
  if (!day || !daysIncluded){
    return [];
  } else {
    return  state.days.filter(appointment => appointment.name === day)[0].appointments.map(i => state.appointments[i]);     
  }
}
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const newInterviewObj = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
    return newInterviewObj;
  }
}
export function getInterviewersForDay(state, day) {
  const daysFound = state.days.find(i => day === i.name);

  if (!state.days || daysFound === undefined) return [];

  return daysFound.interviewers.map(id => state.interviewers[id]);
}


