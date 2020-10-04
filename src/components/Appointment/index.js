import React,{ Fragment }from "react";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import  {useVisualMode} from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE  = "CREATE ";
const SAVE = "SAVE"
const DELETE = "DELETE"
const CONFIRM = "CONFIRM"
const EDIT   = "EDIT";
export default function Appointment(props) {
  console.log("props.interviw", props.interview)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    transition(SAVE)
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }
  function cancel() {
    transition(DELETE);
    const interview = null;
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((err) => {
        console.log("deleteInterview: ERROR", err)
        //transition(ERROR);
      });
  }
return <article className="appointment">
  <Header time={props.time}/>
  {/* { mode === EMPTY && <Empty onAdd={(() => transition(CREATE))} />} */}
  {mode === SHOW && (<Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={() => transition(EDIT)}
    onDelete={() => transition(CONFIRM)}/>)}
  { mode === EMPTY && <Empty onAdd={(() => transition(CREATE))}/>} 
  {mode === CREATE &&(<Form interviewers={props.interviewers}
  onSave={ save } onCancel={back}/>)}
  { mode === SAVE && <Status message={SAVE}/>
   || mode === DELETE && <Status message={DELETE}/>}
   {mode === CONFIRM &&<Confirm message={"Are you sure you want to Delete"}
   onConfirm={cancel} onCancel={back}/>}
{mode === EDIT && <Form name={props.interview.student}
interviewer={props.interview.interviewer.id} interviewers={props.interviewers}
onSave={save} onCancel={back}/>}
</article>
}