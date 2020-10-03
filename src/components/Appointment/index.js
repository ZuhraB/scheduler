import React,{ Fragment }from "react";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import  {useVisualMode} from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
return <article className="appointment">
<Fragment>
  <Header time={props.time}/>
   { props.interview ? (<Show interviewer={props.interview.interviewer}
    student={props.interview.student}
    onEdit={()=>{}}
    onDelet={()=>{}}/>) : <Empty/> 
    }
    {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
  </Fragment>
</article>
}