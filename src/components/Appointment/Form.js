import React, {useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from "components/Button";

export default function Header(props) {
  const [name, setName] = useState(props.name)
  const [interviewer, setInterviewer] = useState(props.interviewer)
  
  const onChange = (event)=> {
    setName(event.target.value)
  }
  
  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        onClick={props.onSave}
        onClick={props.onCancel}
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={onChange}
        
        /*
          This must be a controlled component
        */
       
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}></Button>
      <Button confirm onClick={props.onSave}></Button>
    </section>
  </section>
</main>
  )
}