import React,{ Fragment }from "react";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import {bookInterview } from "components/Application/"
import  {useVisualMode} from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE  = "CREATE ";
export default function Appointment(props) {
  console.log("props.interviw", props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };//after api I do a .then to Show
    props.bookInterview(interview)
    transition(SHOW);
  }
  console.log("mode:", mode)
return <article className="appointment">
<Fragment>
  <Header time={props.time}/>
   
{ mode === EMPTY && <Empty onAdd={(() => transition(CREATE))} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />)
}
 {mode === CREATE &&
  (<Form
   interviewers={props.interviewers}
   onSave={(name, interviewer) => save(name, interviewer)}
   onCancel={back}
  />)
}
  </Fragment>
</article>
}