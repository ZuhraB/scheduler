
// given the stat and a day firs checks if the givent day is found in days then gets
//  the array of the appoinments and based on the id of the assignments returns appointments
//  for that day
export function getAppointmentsForDay(state, day) {
  const daysInDay = state.days.map(day => day.name);
  const daysIncluded = daysInDay.includes(day)
  if (!day || !daysIncluded){
    return [];
  } else {
    return  state.days.filter(appointment => appointment.name === day)[0].appointments.map(i => state.appointments[i]);     
  }
}
//given the state and the interview object returns an new object 
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
//given an state and an interveiw first checks if the given day which is a string exists or not 
// if yes based on the days gets the interviewers 
export function getInterviewersForDay(state, day) {
  const daysFound = state.days.find(i => day === i.name);

  if (!state.days || daysFound === undefined) return [];

  return daysFound.interviewers.map(id => state.interviewers[id]);
}


