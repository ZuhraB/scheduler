import React,{ Fragment }from "react";
import "./styles.scss";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
export default function Appointment(props) {
return <article className="appointment">
<Fragment>
  <Header time={props.time}/>
   { props.interview ? (<Show interviewer={props.interview.interviewer}
    name={props.name}
    onEdit={()=>{}}
    onDelet={()=>{}}/>) : <Empty/>  }
  </Fragment>
</article>

}